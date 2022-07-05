import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IReply, IThread } from '../../types/threadTypes'

interface IFetchParams {
    input: string;
    limit: number;
    page: number;
}

export const threadAPI = createApi({
    reducerPath: 'threadAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['thread', 'reply'],
    endpoints(build) {
        return {
            fetchThreads: build.query<IThread[], IFetchParams>({
                query: (params) => ({
                    url: '/threads',
                    params: params
                }),
                providesTags: ['thread', 'reply']
            }),
            fetchSingleThread: build.query<IThread, string>({
                query: (id) => ({
                    url: '/getthread',
                    params: {
                        id
                    }
                }),
                providesTags: ['reply']
            }),
            createThread: build.mutation<any, IThread>({
                query: (thread)=>({
                    url: '/threads',
                    method: 'POST',
                    body: thread
                }),
                invalidatesTags: ['thread']
            }),
            createReply: build.mutation<any, IReply>({
                query: (reply) => ({
                    url: '/reply',
                    method: 'PUT',
                    body: reply
                }),
                invalidatesTags: ['reply']
            })
        }
    },
})