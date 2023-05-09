export type ErrorResponse = {
    error: string,
    details: string[]
}

export type ErrorResponseFromData = {
    data: {
        error: string,
        details: string[]
    }
}