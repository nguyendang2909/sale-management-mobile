import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiResponse } from 'src/types';

import { api } from './api';

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchSettings: builder.query<ApiResponse.Setting, void>({
      query: () => ({
        url: API_ENDPOINTS.ME.SETTINGS,
        method: API_METHODS.GET,
      }),
    }),
  }),
});

export const { endpoints: settingEndpoints, useFetchSettingsQuery } = usersApi;
