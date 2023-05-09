import {ErrorResponse, ErrorResponseFromData} from "../types/responses/ErrorResponse";

export function isErrorResponse(error: unknown): error is ErrorResponse {
    return (
        typeof error === "object" && error != null &&
        "details" in error && Array.isArray(error.details)
    );
}

export function isErrorResponseFromData(error: unknown): error is ErrorResponseFromData {
    return (
        typeof error === "object" && error != null &&
        "data" in error && typeof error.data === "object" && error.data !== null &&
        "details" in error.data && Array.isArray(error.data.details)
    );

}