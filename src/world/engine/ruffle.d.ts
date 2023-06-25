declare type AutoPlay = | "on" | "off" | "auto";

declare type Letterbox = | "off" | "fullscreen" | "on";

declare type UnmuteOverlay = | "visible" | "hidden";

declare type LogLevel = | "error" | "warn" | "info" | "debug" | "trace";

declare type WindowMode = | "window" | "opaque" | "transparent" | "direct" | "gpu";

declare type RenderBackend = | "webgpu" | "wgpu-webgl" | "webgl" | "canvas";

declare type ContextMenu = | "on" | "rightClickOnly" | "off";

type SecsDuration = number;

interface ObsoleteDuration {
    secs: number;
    nanos: number;
}

type Duration = SecsDuration | ObsoleteDuration;

declare type OpenURLMode = | "allow" | "confirm" | "deny";

declare type NetworkingAccessMode = | "all" | "internal" | "none";

interface BaseLoadOptions {
    allowScriptAccess?: boolean;
    parameters?: URLSearchParams | string | Record<string, string> | null;
    autoplay?: AutoPlay;
    backgroundColor?: string | null;
    letterbox?: Letterbox;
    unmuteOverlay?: UnmuteOverlay;
    upgradeToHttps?: boolean;
    compatibilityRules?: boolean;
    favorFlash?: boolean;
    warnOnUnsupportedContent?: boolean;
    logLevel?: LogLevel;
    showSwfDownload?: boolean;
    contextMenu?: ContextMenu | boolean;
    preloader?: boolean;
    splashScreen?: boolean;
    maxExecutionDuration?: Duration;
    base?: string | null;
    menu?: boolean;
    salign?: string;
    forceAlign?: boolean;
    quality?: string;
    scale?: string;
    forceScale?: boolean;
    frameRate?: number | null;
    wmode?: WindowMode;
    playerVersion?: number | null;
    preferredRenderer?: RenderBackend | null;
    publicPath?: string | null;
    polyfills?: boolean;
    openUrlMode?: OpenURLMode;
    allowNetworking?: NetworkingAccessMode;
}

interface URLLoadOptions extends BaseLoadOptions {
    url: string;
}

interface DataLoadOptions extends BaseLoadOptions {
    data: Iterable<number>;
    swfFileName?: string;
}

interface MovieMetadata {
    readonly width: number;
    readonly height: number;
    readonly frameRate: number;
    readonly numFrames: number;
    readonly swfVersion: number;
    readonly backgroundColor: string | null;
    readonly isActionScript3: boolean;
    readonly uncompressedLength: number;
}

export interface RuffleConfig {
    publicPath?: string | undefined;
    polyfills?: boolean;

    // Options affecting files only
    allowScriptAccess?: boolean;
    autoplay?: 'auto' | 'off' | 'on';
    unmuteOverlay?: 'visible"' | 'hidden';
    backgroundColor?: string;
    wmode?: 'opaque' | 'transparent';
    letterbox?: 'fullscreen' | 'off' | 'on';
    warnOnUnsupportedContent?: boolean;
    contextMenu?: 'on' | 'rightClickOnly' | 'off';
    showSwfDownload?: boolean;
    upgradeToHttps?: boolean;
    maxExecutionDuration?: number;
    logLevel?: 'error' | 'warn' | 'info' | 'debug' | 'trace';
    base?: string;
    menu?: boolean;
    salign?: string;
    forceAlign?: boolean;
    scale?: 'showAll' | 'noborder' | 'exactfit' | 'noscale';
    forceScale?: boolean;
    frameRate?: number;
    quality?: 'low' | 'medium' | 'high' | 'best';
    playerVersion?: number;
    splashScreen?: boolean;
    preferredRenderer?: 'webgpu' | 'wgpu-webgl' | 'webgl' | 'canvas';
    openUrlMode?: 'allow' | 'confirm' | 'deny';
    allowNetworking?: 'all' | 'internal' | 'none';
    favorFlash?: boolean;
}

export interface RuffleSource {
    version: string;
    polyfill(): void;
    pluginPolyfill(): void;
    createPlayer(): RufflePlayer;
}

declare type ReadyState = | 0 | 1 | 2;

export interface RufflePlayer extends HTMLElement {
    onFSCommand: ((command: string, args: string) => boolean) | null;
    config: URLLoadOptions | DataLoadOptions | object;
    get readyState(): number;
    get metadata(): MovieMetadata | null;
    getExtensionConfig(): Record<string, unknown>;
    load(
        options: string | URLLoadOptions | DataLoadOptions
    ): Promise<void>;
    play(): void;
    get isPlaying(): boolean;
    volume: number;
    get fullscreenEnabled(): boolean;
    get isFullscreen(): boolean;
    setFullscreen(isFull: boolean): void;
    enterFullscreen(): void;
    exitFullscreen(): void;
    downloadSwf(): Promise<void>;
    pause(): void;
    set traceObserver(observer: ((message: string) => void) | null);
    destroy(): void;
}

export interface RuffleAPI {
    config: DataLoadOptions | URLLoadOptions | object;
    conflict: Record<string, unknown> | null;
    get version(): string;
    registerSource(name: string): void;
    newestSourceName(): string | null;
    init(): void;
    newest(): RuffleSource | null;
    satisfying(requirementString: string): RuffleSource | null;
    localCompatible(): RuffleSource | null;
    local(): RuffleSource | null;
}

declare global {
    interface Window {
        RufflePlayer?: RuffleAPI;
    }
}
