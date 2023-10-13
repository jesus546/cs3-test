import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { InData } from './interface'

const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/todos",
        prepareHeaders: (headers) => headers
    }),
    tagTypes: ['InData'],
    endpoints: (builder) => (
        {
            allTodo: builder.query<InData, void>({
                query: () => `/` ,
                transformResponse: (data: InData) => data,
            }),
            addTodo: builder.mutation({
                query: (payload) => (
                    {
                        url: "/add",
                        method: 'POST',
                        body: payload
                    }
                )
            }),
            updatedTodo: builder.mutation({
                query: (payload) => (
                    {
                        url: '/' + payload.id,
                        method: 'PUT',
                        body: payload.body
                    }
                )
            }),
            deleteTodo: builder.mutation({
                query: (payload) => (
                    {
                        url: '/' + payload,
                        method: 'DELETE',
                    }
                )
            })
        }
    )
})

export default todoApi