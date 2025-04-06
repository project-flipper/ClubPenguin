import { io, Socket } from "socket.io-client";

import { App } from "@clubpenguin/app/app";
import { ApiResponse, CreateUserResponse, FriendsResponse, LoginResponse, MyUserResponse, UserResponse, WorldsResponse, CreateUserForm } from "@clubpenguin/net/types/api";
import { getLogger } from "@clubpenguin/lib/log";
import { sleep } from "@clubpenguin/lib/time";

let logger = getLogger('CP.net.airtower');

/**
 * The base error used by Airtower.
 * Represents an error thrown by a non-successful HTTP request.
 */
export class HTTPError extends Error {
    public response: Response;
    public data: any;

    /**
     * @param response The response as returned by {@link fetch}.
     * @param data If any, the data returned by the endpoint.
     * @param options Additional options to pass to the {@link Error} constructor.
     */
    constructor(response: Response, data: any, options?: ErrorOptions) {
        let message: string;
        if (data?.error?.error_type) message = `${response.status} ${response.statusText} (type: ${data.error.error_type} code: ${data.error.error_code} description: ${data.error.error_description}) at ${response.url}`;
        else message = `${response.status} ${response.statusText} at ${response.url}`;

        super(message, options);

        this.response = response;
        this.data = data;
    }
}

/**
 * Represents a 401 HTTP request.
 */
export class Unauthorized extends HTTPError { }

/**
 * Represents a 403 HTTP request.
 */
export class Forbidden extends HTTPError { }

/**
 * Represents a 404 HTTP request.
 */
export class NotFound extends HTTPError { }

/**
 * Represents a 429 HTTP request.
 * This error is not usually thrown, as {@link Airtower.request} handles ratelimits unless explicitly stated.
 * In the case ratelimit handling is disabled, then will this error be thrown.
 */
export class TooManyRequests extends HTTPError { }

/**
 * Represents a 500 and above HTTP request.
 */
export class ServerError extends HTTPError { }

/**
 * Represents an API route to which requests may be made.
 * Some endpoints may introduce HTTP method constraints with an enum generic parameter.
 * This class is typically not used directly as Airtower abstracts away API calls.
 * However, if the need arises to define a new endpoint then this may be used in conjunction to {@link Airtower.request}.
 */
export class Route<M = string> {
    public method: M;
    public path: string;
    public mapping: Record<string, any>;
    public searchParams: Record<string, any>;

    /**
     * @param method The HTTP method to which this route will be requested.
     * @param path A relative URL that will be appended to the base API path. Do NOT include entity data, use the mapping parameter instead.
     * @param mapping The mapped object for path replacement when resolving to a URL.
     */
    constructor(method: M, path: string, mapping?: Record<string, any>) {
        this.method = method;
        this.path = path;
        this.mapping = mapping;
    }

    /**
     * Adds a querystring to this route.
     * @param searchParams The mapped querystring to use for this route.
     * @returns The route instance, to allow chaining.
     */
    query(searchParams: Record<string, any>): this {
        this.searchParams = searchParams;
        return this;
    }

    /**
     * Constructs a URL so that a request can be made to this route.
     * @param base The base API path.
     * @returns The constructed URL.
     */
    getURL(base: string): URL {
        let path = this.path;

        for (let key in this.mapping) {
            path = path.replace(new RegExp('{' + key + '}', 'gi'), this.mapping[key]);
        }

        let url = new URL(base + path);

        if (this.searchParams) {
            for (let prop in this.searchParams) url.searchParams.append(prop, this.searchParams[prop]);
        }

        return url;
    }
}

/**
 * The available options to perform a request with {@link Airtower.request}.
 */
export type RequestOptions = {
    headers?: Record<string, string>,
    json?: any,
    form?: { [key: string]: any },
    body?: any,
    handleRatelimit?: boolean,
    handleUnauthorized?: boolean,
    authorization?: string
};

export type DisneyFriendsCallbackParams = {
    size: number;
    language: string;
    photo: boolean;
    bypassPlayerSettingCache: boolean;
};

/**
 * The game API wrapper.
 * It acts as a bridge between the game client and the game server, as it implements any logic
 * that handles server communication including the Rest API, WebSocket connection and GraphQL.
 */
export class Airtower extends Phaser.Events.EventEmitter {
    Route = Route;

    public app: App;
    public basePath: string;

    /**
     * @param app The current App.
     * @param basePath The base path to which requests will be made.
     */
    constructor(app: App, basePath: string) {
        super();
        this.app = app;

        this.basePath = basePath;
    }

    /**
     * Transforms a relative path into an absolute URL for the game API.
     * This is typically used when external routing is needed externally.
     * @param path The path to resolve.
     * @param query An optional object to use as querystring.
     * @returns The absolute URL.
     */
    getAbsoluteUrl(path: string, query?: Record<string, any>): string {
        return new Route('GET', path).query(query).getURL(this.basePath).href
    }

    /**
     * Utility for Disney's Friend List to access the Avatar endpoint.
     * @returns A callback that generates an absolute URL to the requested asset.
     */
    createAvatarUrlCallback(): (id: string, params: DisneyFriendsCallbackParams) => string {
        return (id: string, params: DisneyFriendsCallbackParams) => {
            return this.getAbsoluteUrl(`/avatars/${id}`, params);
        };
    }

    #token: string;
    #key: string;

    socket: Socket;

    /**
     * Makes a request to the game API.
     * @param route The route to make a request to.
     * @param param1 The parameters to use for this request.
     * @returns The response from the API.
     */
    async request<R = ApiResponse<any, any>>(route: Route, { headers: extraHeaders, json, form, body, handleRatelimit, handleUnauthorized, authorization }: RequestOptions): Promise<R> {
        let params: RequestInit = {
            method: route.method
        };

        if (handleRatelimit == undefined) handleRatelimit = true;
        if (handleUnauthorized == undefined) handleUnauthorized = true;

        let headers: HeadersInit = {
            'Accept-Language': this.app.locale.abbreviation,
            ...(extraHeaders ?? {})
        };

        if (json !== undefined) {
            headers['Content-Type'] = 'application/json';
            params.body = JSON.stringify(json);
        } else if (form !== undefined) {
            params.body = new FormData();
            for (let prop in form) params.body.append(prop, form[prop]);
        } else params.body = body;

        if (authorization) headers['Authorization'] = `Bearer ${authorization}`;
        else if (this.#token) headers['Authorization'] = `Bearer ${this.#token}`;

        params.headers = headers;

        let response: Response;
        let data: R;
        for (let tries = 0; tries < 5; tries++) {
            logger.info(route.method, route.path);
            response = await fetch(route.getURL(this.basePath), params);

            data = await response.json();
            logger.debug(route.method, route.path, 'has received', data);

            if (response.status >= 200 && 300 > response.status) {
                return data;
            }

            if (response.status == 429) {
                if (!handleRatelimit) throw new TooManyRequests(response, data);
                let retryAfter = response.headers.get('Retry-After');
                if (retryAfter) {
                    await sleep(parseInt(retryAfter) * 1000);
                    continue;
                } else {
                    await sleep(1 + tries * 2000);
                    continue;
                }
            }

            if ([500, 502, 504, 524].includes(response.status)) {
                await sleep(1 + tries * 2000);
                continue;
            }

            if (response.status == 401) {
                if (handleUnauthorized) {
                    try {
                        await this.refresh();
                        headers['Authorization'] = `Bearer ${this.#token}`;
                        continue;
                    } catch(e) {
                        logger.error('Unable to refresh token', e);
                    }
                }

                throw new Unauthorized(response, data);
            }
            else if (response.status == 403) throw new Forbidden(response, data);
            else if (response.status == 404) throw new NotFound(response, data);
            else if (response.status >= 500) throw new ServerError(response, data);
            else throw new HTTPError(response, data);
        }

        if (response) {
            if (response.status >= 500) {
                throw new ServerError(response, data);
            } else throw new HTTPError(response, data);
        }

        throw new Error('HTTP request failed.');
    }

    /* REST ENDPOINTS */

    /* ============ AUTH ============ */

    /**
     * Logs into an existing account using credentials, and starts a session for further API requests.
     * This request should be made before attempting to call other game APIs.
     * @param username The username of the account.
     * @param password The password to use.
     * @returns The response from the API.
     */
    async logIn(username: string, password: string): Promise<LoginResponse> {
        logger.info('Logging in');

        let response = await this.request<LoginResponse>(new Route('POST', '/auth/login'), {
            form: {
                username: username,
                password: password,
                save_session: true,
                grant_type: 'password'
            },
            handleRatelimit: false,
            handleUnauthorized: false
        });

        if (response.success) {
            this.#token = response.data.access_token;
            this.#key = response.data.session_key;
        }

        return response;
    }

    /**
     * Refreshes a connection using an access token. Must have previously called {@link Airtower.logIn}.
     * @param key The session key to use for the refresh.
     * @returns The response from the API.
     */
    async refresh(key?: string): Promise<LoginResponse> {
        key = key || this.#key;
        if (!key) throw new Error('Cannot refresh without logging in');

        logger.info('Refreshing access token');

        let response = await this.request<LoginResponse>(new Route('POST', '/auth/refresh'), {
            authorization: key,
            handleRatelimit: false,
            handleUnauthorized: false
        });

        if (response.success) {
            this.#token = response.data.access_token;
            this.#key = response.data.session_key || key;
        }

        return response;
    }

    /* ============ WORLDS ============ */

    /**
     * Queries the API for a list of available worlds to connect to.
     * @returns The response from the API.
     */
    async getWorlds(): Promise<WorldsResponse> {
        return await this.request<WorldsResponse>(new Route('GET', '/worlds/').query({ lang: this.app.locale.bitmask }), {});
    }

    connect(url: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.disconnect(1000);
            let response = await this.refresh();
            this.socket = io(url, {
                transports: ['websocket'],
                reconnection: false,
                auth: {
                    token: response.data.access_token
                }
            });

            this.socket.once('connect', () => {
                logger.info('Socket connection opened');
                this.emit('s:connect');
                resolve();
            });
            this.socket.once('connect_error', error => {
                logger.error('Socket connection closed due to an error', error);
                this.emit('s:error');
                this.socket = undefined;
                reject(error);
            });
            this.socket.on('message', packet => {
                logger.debug('WS %cINCOMING%c', 'color:#FFFFFF;background-color:#22A4F3', '', packet);
                this.emit('s:message', packet);
            });
            this.socket.onAnyOutgoing((event, op, d) => {
                logger.debug('WS %cOUTGOING%c', 'color:#22A4F3;background-color:#FFFFFF', '', { op, d });
            });
            this.socket.once('disconnect', (reason, description) => {
                logger.info('Socket connection closed', { reason, description });
                this.emit('s:disconnect', reason, description);
                this.socket = undefined;
                reject(new Error(`${reason}: ${description}`));
            });
        });
    }

    isConnected(): boolean {
        return this.socket && this.socket.active;
    }

    send(event: string, data: any): void {
        if (this.isConnected()) {
            this.socket.send(event, data);
        } else throw new Error('Connection not yet established');
    }

    disconnect(code?: number, reason?: string): void {
        if (this.socket) {
            this.send('disconnect', { code, reason });
            this.socket.disconnect();
            this.socket = undefined;
        }
    }

    /* ============ USERS ============ */

    /**
     * Creates a new user.
     * @param payload The form to submit to create a new account.
     * @returns The response from the API.
     */
    async createAccount(payload: CreateUserForm): Promise<CreateUserResponse> {
        return await this.request(new Route('PUT', '/users/'), {
            json: payload
        });
    }

    /**
     * Queries the API for our current user data.
     * @returns The response from the API
     */
    async getMyUser(): Promise<MyUserResponse> {
        return await this.request<MyUserResponse>(new Route('GET', '/users/'), {});
    }

    /**
     * Queries for a specific user.
     * @param userId The user ID to query.
     * @returns The response from the API.
     */
    async getUserById(userId: number): Promise<UserResponse> {
        return await this.request<UserResponse>(new Route('GET', '/users/{userId}', { userId }), {});
    }

    /**
     * Queries for a specific user.
     * @param username The username to query.
     * @returns The response from the API.
     */
    async getUserByName(username: string): Promise<UserResponse> {
        return await this.request<UserResponse>(new Route('GET', '/users/search').query({ username }), {});
    }

    /* ============ FRIENDS ============ */

    /**
     * Queries the API for the current friends list.
     * @returns The response from the API
     */
    async getFriends(): Promise<FriendsResponse> {
        return await this.request<FriendsResponse>(new Route('GET', '/friends/'), {});
    }

    /* ============ ITEMS ============ */

    async buyItem(itemId: number): Promise<void> {
        
    }
}
