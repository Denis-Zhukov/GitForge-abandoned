import axios from "axios";
import {Url} from "../constans/Url";

export const $api = axios.create({
    baseURL: Url.BASE_URL,
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
})

$api.interceptors.response.use((config) => config, async (error) => {
    const request = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRertry) {
        request._isRetry = true;
        try {
            const response = await axios.post(Url.REFRESH_ACCESS_TOKEN, {}, {withCredentials: true});
            localStorage.setItem("access_token", response.data.access_token)
            return $api.request(request);
        } catch (e) {
            console.log('Unauthorized')
        }
    }
    throw error;
})