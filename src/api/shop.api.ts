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
    fetchSaleOverallByShop: builder.query<
      ApiResponse.SaleOverallByShopId,
      { shopId: string; params: ApiRequest.FindSaleOverallByShopId }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.SALE.OVERALL(shopId),
        method: API_METHODS.GET,
        params,
      }),
    }),
    fetchSaleStatisticsByShop: builder.query<
      ApiResponse.SaleStatisticsByShopId,
      { shopId: string; params: ApiRequest.FindSaleOverallByShopId }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.SALE.STATISTICS(shopId),
        method: API_METHODS.GET,
        params,
      }),
    }),
  }),
});

export const {
  useFetchAllShopsQuery,
  useLazyFetchAllShopsQuery,
  useFetchSaleOverallByShopQuery,
  useLazyFetchSaleOverallByShopQuery,
  useFetchSaleStatisticsByShopQuery,
  useLazyFetchSaleStatisticsByShopQuery,
  endpoints: shopEndpoints,
} = shopApi;
