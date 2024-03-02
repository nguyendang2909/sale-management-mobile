import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signInWithPhoneNumber: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithPhoneNumber>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.PHONE,
        method: 'POST',
        body,
      }),
    }),

    signInWithGoogle: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithGoogle>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.GOOGLE,
        method: 'POST',
        body,
      }),
    }),

    signInWithApple: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithApple>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.APPLE,
        method: 'POST',
        body,
      }),
    }),

    signInWithFacebook: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithFacebook>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.FACEBOOK,
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
  useSignInWithAppleMutation,
  useSignInWithPhoneNumberMutation,
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
  useLogoutMutation,
  useRefreshAccessTokenMutation,
  endpoints: authEndpoints,
} = authApi;
