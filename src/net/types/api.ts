import { WorldData } from "./login/world";
import { MyPenguinData, PenguinData } from "./penguin/penguin";

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

export type CreateAccountResponse = ApiResponse<{
    user_id?: string,
    validation_errors: []
}>;

export type MyUserResponse = ApiResponse<MyPenguinData>;

export type FriendsResponse = ApiResponse<PenguinData[]>;

export type UserResponse = ApiResponse<PenguinData>;
