import axios from "axios";
import {$api} from "../config";
import {urls} from "../urls";

export class AuthService {
    static async login(username: string, password: string) {
        try {
            const response = await axios.post(
                urls.loginUrl,
                {username, password},
                {withCredentials: true}
            );
            localStorage.setItem("access_token", response.data.access_token);
            return response;
        } catch (e: any) {
            return e.response;
        }
    }

    static async register(username: string, email: string, password: string) {
        try {
            const response = await axios.post(urls.registerUrl, {username, password, email});
            return response;
        } catch (e: any) {
            return e.response;
        }
    }

    static async checkAuth() {
        try {
            const response = await $api.post("http://localhost:8000/api/refresh", {}, {withCredentials: true});
            localStorage.setItem("access_token", response.data.access_token);
            return response;
        } catch (e: any) {
            return e.response;
        }
    }

    static async logout() {
        localStorage.removeItem("access_token");
        return await axios.post("http://localhost:8000/logout", {}, {withCredentials: true});
    }

    static async getRoles() {
        const response = await $api.get("http://localhost:8000/my-roles");
        return response.data;
    }
}