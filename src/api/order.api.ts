import { API_ENDPOINTS } from 'src/config/config.api';
import { ORDER_STATUSES } from 'src/constants';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<
      ApiResponse.Order,
      { shopId: string; body: ApiRequest.CreateOrder }
    >({
      query: ({ shopId, body }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.POST,
        body,
      }),
    }),

    fetchOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params,
      }),
    }),

    fetchUnconfirmedOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.UNCONFIRMED },
      }),
    }),

    fetchProcessingOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.PROCESSING },
      }),
    }),

    fetchDeliveredOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.DELIVERED },
      }),
    }),

    fetchReturnedOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.RETURNED },
      }),
    }),

    fetchCancelledOrders: builder.query<
      ApiResponse.Orders,
      { shopId: string; params: ApiRequest.FindManyOrders }
    >({
      query: ({ shopId, params }) => ({
        url: API_ENDPOINTS.SHOPS.ORDERS_BY_SHOP_ID(shopId),
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.CANCELLED },
      }),
    }),

    fetchOrder: builder.query<ApiResponse.Order, string>({
      query: id => ({
        url: `${API_ENDPOINTS.ORDERS.INDEX}/${id}`,
        method: API_METHODS.GET,
      }),
    }),

    updateOrder: builder.mutation<void, { id: string; body: ApiRequest.UpdateOrder }>({
      query: ({ id, body }) => ({
        url: API_ENDPOINTS.ORDERS.ID(id),
        method: API_METHODS.PATCH,
        body,
      }),
    }),

    deleteOrder: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.ORDERS.INDEX}/${id}`,
        method: API_METHODS.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrderQuery,
  useFetchOrdersQuery,
  useLazyFetchOrdersQuery,
  useLazyFetchOrderQuery,
  useFetchUnconfirmedOrdersQuery,
  useLazyFetchUnconfirmedOrdersQuery,
  useFetchProcessingOrdersQuery,
  useLazyFetchProcessingOrdersQuery,
  useFetchDeliveredOrdersQuery,
  useLazyFetchDeliveredOrdersQuery,
  useFetchReturnedOrdersQuery,
  useLazyFetchReturnedOrdersQuery,
  useFetchCancelledOrdersQuery,
  useLazyFetchCancelledOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  endpoints: orderEndpoints,
} = productApi;

export type UpdateOrderMutation = ReturnType<typeof useUpdateOrderMutation>[0];
