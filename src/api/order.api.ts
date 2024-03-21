import { API_ENDPOINTS } from 'src/config/config.api';
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
      query: () => ({
        url: API_ENDPOINTS.ORDERS.INDEX,
        method: API_METHODS.GET,
      }),
    }),

    fetchOrder: builder.query<ApiResponse.Order, string>({
      query: id => ({
        url: `${API_ENDPOINTS.ORDERS.INDEX}/${id}`,
        method: API_METHODS.GET,
      }),
    }),

    // updateOrder: builder.mutation<void, { id: string; payload: ApiRequest.UpdateProduct }>({
    //   query: params => ({
    //     url: API_ENDPOINTS.ORDERS.INDEX,
    //     method: API_METHODS.PUT,
    //     params,
    //   }),
    // }),

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
  useDeleteOrderMutation,
  endpoints: orderEndpoints,
} = productApi;
