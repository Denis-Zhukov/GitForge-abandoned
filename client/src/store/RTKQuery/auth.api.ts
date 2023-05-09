import {api} from "./api";
import {RegisterRequest} from "../../types/requestes/RegisterRequest";
import {RegisterResponse} from "../../types/responses/RegisterResponse";

const authApi = api.injectEndpoints({
    endpoints: build => ({
        register: build.mutation<RegisterResponse, RegisterRequest>({
            query: (account: RegisterRequest) => ({
                body: account,
                url: "/sign-up",
                method: "POST"
            }),
        })
    })
})

export const {useRegisterMutation} = authApi;