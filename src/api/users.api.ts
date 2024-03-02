import { API_ENDPOINTS } from 'src/config';
import { ApiResponse } from 'src/types';

import { api } from './api';

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    deleteMe: builder.mutation<ApiResponse.Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.USERS.ME,
        method: 'GET',
      }),
    }),

    block: builder.mutation<ApiResponse.Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.USERS.BLOCKS,
        method: 'GET',
      }),
    }),
  }),
});

export const { endpoints: userEndpoints } = usersApi;
