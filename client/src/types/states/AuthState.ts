import {ErrorResponse} from "../responses/ErrorResponse";

export type AuthState = {
    authorized: boolean
    username: string | null
    roles: string[],
    isLoading: boolean,
    error: ErrorResponse | null
}