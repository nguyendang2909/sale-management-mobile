import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const shopApi = api.injectEndpoints({
  endpoints: builder => ({
    getManyShops: builder.query<ApiResponse.Shops, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_ENDPOINTS.SHOPS.INDEX,
        method: API_METHODS.GET,
      }),
    }),
  }),
});

export const { useGetManyShopsQuery, endpoints: likeEndpoints } = shopApi;
