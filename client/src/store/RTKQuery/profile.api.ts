import {api} from "./api";
import {GetProfileResponse} from "../../types/rtks/responses/GetProfileResponse";

const authApi = api.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<GetProfileResponse, string>({
            query: (username: string) => ({
                url: `/profile/${username}`,
                method: "GET"
            }),
            providesTags: ["Avatar", "Profession", "Summary"]
        }),
        uploadProfileAvatar: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('image', file);

                return ({
                    url: '/profile/upload-avatar',
                    method: 'POST',
                    body: formData,
                })
            },
            invalidatesTags: ["Avatar"]
        }),
        deleteProfileAvatar: builder.mutation({
            query: () => ({
                url: '/profile/delete-avatar',
                method: 'POST'
            }),
            invalidatesTags: ["Avatar"]
        }),

        setProfileProfession: builder.mutation({
            query: (profession) => ({
                url: '/profile/set-profession',
                method: 'POST',
                body: {profession}
            }),
            invalidatesTags: ["Profession"]
        }),

        setProfileSummary: builder.mutation({
            query: (summary) => ({
                url: '/profile/set-summary',
                method: 'POST',
                body: {summary}
            }),
            invalidatesTags: ["Summary"]
        })
    })
})
export const {
    useGetProfileQuery,
    useUploadProfileAvatarMutation,
    useDeleteProfileAvatarMutation,
    useSetProfileProfessionMutation,
    useSetProfileSummaryMutation
} = authApi;