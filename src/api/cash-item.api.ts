import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const cashItemApi = api.injectEndpoints({
  endpoints: builder => ({
    createCashItem: builder.mutation<
      ApiResponse.Product,
      { shopId: string; body: ApiRequest.CreateCashItem }
    >({
      query: ({ shopId, body }) => ({
        url: API_ENDPOINTS.CASH_ITEMS.SHOPS.SHOP_ID.INDEX(shopId),
        method: API_METHODS.POST,
        body,
      }),
    }),
    fetchAllCashItemsGroupDate: builder.query<
      ApiResponse.CashItemsGroupDate,
      { shopId: string; params: ApiRequest.FindAllCashItems }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.CASH_ITEMS.SHOPS.SHOP_ID.INDEX(shopId),
        method: API_METHODS.GET,
        params,
      }),
    }),
    fetchCashItemsOverall: builder.query<
      ApiResponse.CashItemsOverall,
      { shopId: string; params: ApiRequest.FindAllCashItems }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.CASH_ITEMS.SHOPS.SHOP_ID.OVERALL.GET_INDEX(shopId),
        method: API_METHODS.GET,
        params,
      }),
    }),
  }),
});

export const {
  useCreateCashItemMutation,
  useFetchAllCashItemsGroupDateQuery,
  useLazyFetchAllCashItemsGroupDateQuery,
  useFetchCashItemsOverallQuery,
  useLazyFetchCashItemsOverallQuery,
  endpoints: cashItemEndpoints,
} = cashItemApi;
