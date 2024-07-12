import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const shopApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchAllShops: builder.query<ApiResponse.Shops, void>({
      query: () => ({
        url: API_ENDPOINTS.SHOPS.ALL,
        method: API_METHODS.GET,
      }),
    }),
    fetchShop: builder.query<ApiResponse.Shop, string>({
      query: shopId => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.get(shopId),
        method: API_METHODS.GET,
      }),
    }),
    updateShop: builder.mutation<void, { shopId: string; body: ApiRequest.UpdateShop }>({
      query: ({ shopId, body }) => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.get(shopId),
        method: API_METHODS.PATCH,
        body,
      }),
    }),
  }),
});

export const {
  useFetchAllShopsQuery,
  useLazyFetchAllShopsQuery,
  useUpdateShopMutation,
  useFetchShopQuery,
  useLazyFetchShopQuery,
  endpoints: shopEndpoints,
} = shopApi;
