import { API_ENDPOINTS } from 'src/config';
import { API_TAGS } from 'src/constants/constants';
import { ApiResponse } from 'src/types';

import { api } from './api';

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyUser: builder.query<ApiResponse.Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.USERS.ME,
        method: 'GET',
      }),
      providesTags: [API_TAGS.MY_USER],
    }),

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

export const { useGetMyUserQuery, endpoints: userEndpoints } = usersApi;
