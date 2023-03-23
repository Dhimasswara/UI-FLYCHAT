import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../reducer/authSlice'

// const endpoint = 'http://localhost:4000'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_API,
  credentials: "same-origin",
  prepareHeaders: (headers, {getState}) => {
    
    if(localStorage.getItem('token')) {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
    }

    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if(result?.error && result?.error?.status == 403) {
  //   // const refreshResult = await baseQuery('/user/refresh-token', api, extraOptions)

  //   // if(refreshResult.data){
  //   //   const user = refreshResult?.data?.data?.data;
  //   //   const {iat, exp, ...other} = user
  //   //   const token = refreshResult?.data?.data?.token
  //   //   api.dispatch(setCredentials({user: other, token}))

  //   //   result = await baseQuery(args, api, extraOptions)
  //   // }
  // }

  // if(result?.error?.status == 401) {
  //   api.dispatch(logout())
  // }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({})
})