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
    updateShop: builder.mutation<void, { shopId: string; body: ApiRequest.UpdateShop }>({
      query: ({ shopId, body }) => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.INDEX(shopId),
        method: API_METHODS.PATCH,
        body,
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
    fetchCountOrdersByShop: builder.query<
      ApiResponse.Count,
      { shopId: string; params: ApiRequest.FindAllOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.SHOP_ID.ORDERS.COUNT(shopId),
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
  useFetchCountOrdersByShopQuery,
  useLazyFetchCountOrdersByShopQuery,
  useUpdateShopMutation,
  endpoints: shopEndpoints,
} = shopApi;
