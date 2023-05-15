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
            providesTags: ["Repository"]
        }),
        createRepository: builder.mutation({
            query: (name: string) => ({
                url: `/create-repo`,
                method: "POST",
                body: {name}
            }),
            invalidatesTags: ["Repositories"]
        }),
        deleteRepository: builder.mutation({
            query: (repo: string) => ({
                url: `/delete-repo/${repo}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Repositories"]
        })
    })
})
export const {
    useCreateRepositoryMutation,
    useGetRepositoriesQuery,
    useGetRepositoryQuery,
    useDeleteRepositoryMutation
} = repositoryApi;