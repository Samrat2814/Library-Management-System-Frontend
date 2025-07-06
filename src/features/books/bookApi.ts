import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook, IBorrowPayload } from "./book.types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-api-wine.vercel.app/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      transformResponse: (response: { success: boolean; data: IBook[] }) => response.data,
      providesTags: ["Books"],
    }),
    getBook: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { success: boolean; data: IBook }) => response.data,
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation<{ success: boolean }, IBorrowPayload>({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
} = bookApi;
