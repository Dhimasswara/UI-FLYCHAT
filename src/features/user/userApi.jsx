import { apiSlice } from '../../app/api/authApi';

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ['getAllUser'],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({find}) => {
        return {
        url: `/?search=${find}`,
      }},

      providesTags: ['getAllUser'],
      transformResponse: (response, meta, args) => response.data,
    }), 
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),

      providesTags: ['getUserById'],
      transformResponse: (response, meta, args) => response.data[0],
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `update/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['getUserById'],
      transformResponse: (response, meta, args) => response,
    }),
  }),
});

export const { useGetAllUserQuery, useGetUserByIdQuery, useUpdateUserByIdMutation } = userApi;