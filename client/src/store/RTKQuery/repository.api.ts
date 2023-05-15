import {api} from "./api";

const repositoryApi = api.injectEndpoints({
    endpoints: builder => ({
        getRepositories: builder.query<Array<{
            name: string,
            id: number,
            language: string,
            description: string
        }>, any>({
            query: (username: string) => ({
                url: `/${username}/repos`,
                method: "GET"
            }),
            providesTags: ["Repositories"]
        }),

        getRepository: builder.query<{
            name: string,
            id: number,
            files: string[],
            description: string,
            favorite: boolean
        }, any>({
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
        }),

        setDescriptionRepository: builder.mutation({
            query: ({repo, description}: { repo: string, description: string }) => ({
                url: `/update-repo/${repo}`,
                method: "POST",
                body: {description}
            }),
            invalidatesTags: ["Repositories", "Repository"]
        }),

        toggleFavorite: builder.mutation({
            query: (repo: string) => ({
                url: `/toggle-favorite/${repo}`,
                method: "POST",
            }),
            invalidatesTags: ["Repositories", "Repository"]
        }),

        getFavoritesRepositories: builder.query<{
            name: string,
            id: number,
            files: string[],
            description: string,
            favorite: boolean,
            language: string
        }[], string>({
            query: (username: string) => ({
                url: `/${username}/repos/favorites`,
                method: "GET",
            }),
            providesTags: ["Repositories"]
        }),
    })
})
export const {
    useCreateRepositoryMutation,
    useGetRepositoriesQuery,
    useGetRepositoryQuery,
    useDeleteRepositoryMutation,
    useSetDescriptionRepositoryMutation,
    useToggleFavoriteMutation,
    useGetFavoritesRepositoriesQuery
} = repositoryApi;