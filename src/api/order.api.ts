import { API_ENDPOINTS } from 'src/config/config.api';
import { ORDER_STATUSES } from 'src/constants';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<ApiResponse.Order, ApiRequest.CreateOrder>({
      query: body => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),

    fetchOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params,
      }),
    }),

    fetchUnconfirmedOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.UNCONFIRMED },
      }),
    }),

    fetchProcessingOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.PROCESSING },
      }),
    }),

    fetchDeliveredOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.DELIVERED },
      }),
    }),

    fetchReturnedOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.RETURNED },
      }),
    }),

    fetchCancelledOrders: builder.query<ApiResponse.Orders, ApiRequest.FindManyOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params: { ...params, status: ORDER_STATUSES.CANCELLED },
      }),
    }),

    fetchOrder: builder.query<ApiResponse.Order, string>({
      query: id => ({
        url: API_ENDPOINTS.ORDERS.ID.get(id),
        method: API_METHODS.GET,
      }),
    }),

    fetchCountOrders: builder.query<ApiResponse.Count, ApiRequest.FindAllOrders>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
        params,
      }),
    }),

    updateOrder: builder.mutation<void, { id: string; body: ApiRequest.UpdateOrder }>({
      query: ({ id, body }) => ({
        url: API_ENDPOINTS.ORDERS.ID.get(id),
        method: API_METHODS.PATCH,
        body,
      }),
    }),

    fetchOrderOverall: builder.query<ApiResponse.OrderOverall, ApiRequest.FindOrderOverall>({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.OVERALL.INDEX,
        method: API_METHODS.GET,
        params,
      }),
    }),

    fetchOrderStatistics: builder.query<
      ApiResponse.OrderStatistics,
      ApiRequest.FindOrderStatistics
    >({
      query: params => ({
        url: API_ENDPOINTS.ORDERS.STATISTICS.INDEX,
        method: API_METHODS.GET,
        params,
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
  useFetchOrderOverallQuery,
  useLazyFetchOrderOverallQuery,
  useFetchCountOrdersQuery,
  useLazyFetchCountOrdersQuery,
  useFetchOrderStatisticsQuery,
  useLazyFetchOrderStatisticsQuery,
  endpoints: orderEndpoints,
} = productApi;

export type UpdateOrderMutation = ReturnType<typeof useUpdateOrderMutation>[0];
