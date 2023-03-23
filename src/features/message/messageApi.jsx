import { apiSlice } from '../../app/api/authApi';

export const messageApi = apiSlice.injectEndpoints({
  tagTypes: ['getReceiverById'],
  endpoints: (builder) => ({
    getReceiverById: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),

      providesTags: ['getReceiverById'],
      transformResponse: (response, meta, args) => response.data,
    }), 
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/message/add`,
        method: "POST",
        body: data
      }),

      providesTags: ['getReceiverById'],
      transformResponse: (response, meta, args) => response.data,
    }), 
  }),
});

export const { useGetReceiverByIdQuery, useCreateMessageMutation } = messageApi;