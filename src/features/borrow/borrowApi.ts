import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IBorrowSummary {
  title: string
  isbn: string
  totalQuantity: number
}

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-api-wine.vercel.app/api' }),
  endpoints: (builder) => ({
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => '/borrow',
    }),
  }),
})

export const { useGetBorrowSummaryQuery } = borrowApi
