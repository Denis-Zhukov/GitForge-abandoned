export enum Path {
    ANY = "*",
    MAIN = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    LOGOUT = "/logout",

    PROFILE = "/:username",
    PROFILE_REPOSITORIES = "/repositories",
    PROFILE_CREATE_REPOSITORY = "/create-repository",

    SETTINGS = "/settings",
    SETTINGS_PROFILE = "/profile",

    REPOSITORY = "/:username/:repository"
}