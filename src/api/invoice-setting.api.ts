import { API_ENDPOINTS } from 'src/config';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const invoiceSettingApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchInvoiceSettings: builder.query<ApiResponse.InvoiceSetting, void>({
      query: () => ({
        url: API_ENDPOINTS.ME.SETTINGS.INVOICES.INDEX,
        method: API_METHODS.GET,
      }),
    }),
    updateInvoiceSettings: builder.mutation<void, ApiRequest.UpdateProductSettings>({
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
  useUpdateInvoiceSettingsMutation,
  useFetchInvoiceSettingsQuery,
  useLazyFetchInvoiceSettingsQuery,
} = invoiceSettingApi;
