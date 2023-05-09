import {ErrorResponse} from "../types/responses/ErrorResponse";

export function isErrorResponse(error: unknown): error is ErrorResponse {
    return (
        typeof error === "object" && error != null &&
        "data" in error && typeof error.data === "object" && error.data !== null &&
        "details" in error.data && Array.isArray(error.data.details)
    );
}