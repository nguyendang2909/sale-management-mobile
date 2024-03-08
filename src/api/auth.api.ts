import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<ApiResponse.Logged, ApiRequest.SignIn>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<void, ApiRequest.Logout>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
        body,
      }),
    }),

    refreshAccessToken: builder.mutation<
      ApiResponse.RefreshAccessToken,
      ApiRequest.RefreshAccessToken
    >({
      query: body => ({
        url: API_ENDPOINTS.AUTH.TOKENS.ACCESS_TOKEN,
        method: API_METHODS.POST,
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useLogoutMutation,
  useRefreshAccessTokenMutation,
  endpoints: authEndpoints,
} = authApi;
