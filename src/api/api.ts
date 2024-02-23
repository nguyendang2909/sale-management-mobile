import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import queryString from 'query-string';
import { ARR_API_TAGS } from 'src/constants/constants';
import { appActions } from 'src/store/app.store';
import { ApiResponse, AppStore } from 'src/types';

import Config, { API_ENDPOINTS } from '../config';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, unknown>) => {
    return queryString.stringify(params);
  },
  baseUrl: Config.API_URL,
  timeout: 15000,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppStore.RootState)?.app?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: async (args, baseQueryApi, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, baseQueryApi, extraOptions);
    if (process.env.NODE_ENV === 'development') {
      if (result.error) {
        console.log(
          `Request ${JSON.stringify(args)} ${JSON.stringify(baseQueryApi)} error: ${JSON.stringify(
            result.error.data,
          )}`,
        );
      }
    }
    if (result.error && (result.error.status as number) === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = (baseQueryApi.getState() as AppStore.RootState).app?.refreshToken;
          const refreshResult = (
            await baseQuery(
              {
                method: 'POST',
                url: API_ENDPOINTS.AUTH.TOKENS.ACCESS_TOKEN,
                body: {
                  refreshToken,
                },
              },
              baseQueryApi,
              extraOptions,
            )
          ).data as ApiResponse.FetchData<ApiResponse.Tokens>;
          if (refreshResult.data) {
            baseQueryApi.dispatch(appActions.updateAccessToken(refreshResult.data));
            result = await baseQuery(args, baseQueryApi, extraOptions);
          } else {
            baseQueryApi.dispatch(appActions.logout());
            baseQueryApi.dispatch(api.util.resetApiState());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, baseQueryApi, extraOptions);
      }
    }

    return result;
  },
  tagTypes: ARR_API_TAGS,
  endpoints: _builder => ({}),
});

export const { endpoints } = api;
