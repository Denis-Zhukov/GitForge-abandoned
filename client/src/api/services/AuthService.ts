import axios from "axios";
import {Url} from "../../constans/Url";
import {$api} from "../config";

export class AuthService {
    static async login(username: string, password: string) {
        return await axios.post(Url.LOGIN,
            {username, password},
            {withCredentials: true}
        );
    }

    static async checkAuth() {
        return await $api.post(Url.CHECK_AUTH,
            {}, {withCredentials: true}
        );
    }

    static async logout() {
        return await axios.post(Url.LOG_OUT, {}, {withCredentials: true});
    }
}