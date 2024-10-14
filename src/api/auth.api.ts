import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signInByPhoneNumber: builder.mutation<ApiResponse.Logged, ApiRequest.SignInByPhoneNumber>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.PHONE.INDEX,
        method: 'POST',
        body,
      }),
    }),
    signInByApple: builder.mutation<ApiResponse.Logged, ApiRequest.SignInByApple>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.APPLE.INDEX,
        method: 'POST',
        body,
      }),
    }),
    signInByGoogle: builder.mutation<ApiResponse.Logged, ApiRequest.SignInByGoogle>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.GOOGLE.INDEX,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<void, ApiRequest.Logout>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.LOGOUT.INDEX,
        method: 'POST',
        body,
      }),
    }),

    refreshTokens: builder.mutation<ApiResponse.RefreshAccessToken, ApiRequest.RefreshAccessToken>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKENS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),
  }),
});

export const {
  useSignInByGoogleMutation,
  useSignInByAppleMutation,
  useSignInByPhoneNumberMutation,
  useLogoutMutation,
  useRefreshTokensMutation,
  endpoints: authEndpoints,
} = authApi;
