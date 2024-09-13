import { WorldData } from "./world";
import { MyUserData, UserData } from "./user";

export type ApiError = {
    error_type: string,
    error_code: number,
    error_description: string
};

export type ApiResponse<D = any, E = ApiError> = {
    has_error: boolean,
    success: boolean,
    data: D,
    error: E
};

export type BanError = ApiError & {
    error_type: number,
    ban_dur: number
};

export type LoginResponse = ApiResponse<{
    access_token: string,
    token_type: string,
    session_key: string
}, BanError>;

export type WorldsResponse = ApiResponse<WorldData[]>;

export type CreateUserForm = {
    name: string,
    color: number,
    password: string,
    email: string,
    token: string,
};

export type CreateUserResponse = ApiResponse<{
    user_id?: string,
    validation_errors: []
}>;

export type MyUserResponse = ApiResponse<MyUserData>;

export type FriendsResponse = ApiResponse<UserData[]>;

export type UserResponse = ApiResponse<UserData>;
