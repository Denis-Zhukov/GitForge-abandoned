const apiUrl = "http://localhost:8000";

export const Url = {
    BASE_URL: apiUrl,
    LOGIN: apiUrl + "/sign-in",
    REGISTER: apiUrl + "/sign-up",
    CHECK_AUTH: apiUrl + "/check-auth",
    REFRESH_ACCESS_TOKEN: apiUrl + "/refresh",
    LOG_OUT: apiUrl + "/log-out"
};