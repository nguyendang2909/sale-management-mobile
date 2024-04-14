import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchProductSettings: builder.query<ApiResponse.ProductSetting, void>({
      query: () => ({
        url: API_ENDPOINTS.ME.SETTINGS.PRODUCTS.INDEX,
        method: API_METHODS.GET,
      }),
    }),
    updateProductSettings: builder.mutation<
      ApiResponse.ProductSetting,
      ApiRequest.UpdateProductSettings
    >({
      query: body => ({
        url: API_ENDPOINTS.ME.SETTINGS.PRODUCTS.INDEX,
        method: API_METHODS.PATCH,
        body,
      }),
    }),
  }),
});

export const {
  endpoints: productSettingEndpoints,
  useFetchProductSettingsQuery,
  useUpdateProductSettingsMutation,
} = orderApi;
