import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchOrderSettings: builder.query<ApiResponse.OrderSetting, void>({
      query: () => ({
        url: API_ENDPOINTS.ORDERS.SETTINGS.INDEX,
        method: API_METHODS.GET,
      }),
    }),
    updateOrderSettings: builder.mutation<ApiResponse.OrderSetting, ApiRequest.UpdateOrderSettings>(
      {
        query: body => ({
          url: API_ENDPOINTS.ORDERS.SETTINGS.INDEX,
          method: API_METHODS.PATCH,
          body,
        }),
      },
    ),
  }),
});

export const {
  endpoints: orderSettingEndpoints,
  useFetchOrderSettingsQuery,
  useLazyFetchOrderSettingsQuery,
  useUpdateOrderSettingsMutation,
} = orderApi;
