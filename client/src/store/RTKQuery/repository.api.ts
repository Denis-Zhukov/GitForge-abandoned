import {api} from "./api";

const repositoryApi = api.injectEndpoints({
    endpoints: builder => ({
        getRepositories: builder.query<Array<{ name: string, id: number, languages: string[] }>, any>({
            query: (username: string) => ({
                url: `/${username}/repos`,
                method: "GET"
            }),
            providesTags: ["Repositories"]
        }),
        getRepository: builder.query<{ name: string, id: number, files: string[] }, any>({
            query: ({username, repository}: { username: string, repository: string }) => ({
                url: `/${username}/${repository}`,
                method: "GET"
            }),
            providesTags: ["Repositories"]
        }),
        createRepository: builder.mutation({
            query: (name: string) => ({
                url: `/create-repo`,
                method: "POST",
                body: {name}
            }),
            invalidatesTags: ["Repositories"]
        })
    })
})
export const {useCreateRepositoryMutation, useGetRepositoriesQuery, useGetRepositoryQuery} = repositoryApi;