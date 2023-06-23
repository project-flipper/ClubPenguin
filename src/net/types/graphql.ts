import { ApiError, ApiResponse } from "./api";

export type GraphQLSyntaxError = {
    message: string,
    locations: {
        line: number,
        column: number
    }[],
    path?: string[]
};

export type GraphQLValidationError = {
    loc: string[],
    msg: string,
    type: string
};

export type GraphQLResponse<D = any, E = GraphQLSyntaxError | GraphQLValidationError | ApiError> = ApiResponse<D, E[]>;
