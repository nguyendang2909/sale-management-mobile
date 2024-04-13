import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiResponse } from 'src/types';

import { api } from './api';

const shopApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchAllShops: builder.query<ApiResponse.Shops, void>({
      query: () => ({
        url: API_ENDPOINTS.SHOPS.INDEX,
        method: API_METHODS.GET,
      }),
    }),
  }),
});

export const { useFetchAllShopsQuery, endpoints: shopEndpoints } = shopApi;
