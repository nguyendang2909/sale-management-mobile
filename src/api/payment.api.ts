import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const paymentApi = api.injectEndpoints({
  endpoints: builder => ({
    createPayment: builder.mutation<ApiResponse.Payment, ApiRequest.CreatePayment>({
      query: body => ({
        url: API_ENDPOINTS.PAYMENTS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),
    fetchAllPaymentsGroupDate: builder.query<
      ApiResponse.PaymentsGroupDate,
      ApiRequest.FindAllPayments
    >({
      query: params => ({
        url: API_ENDPOINTS.PAYMENTS.INDEX,
        method: API_METHODS.GET,
        params,
      }),
    }),
    fetchPaymentsOverall: builder.query<ApiResponse.PaymentsOverall, ApiRequest.FindAllPayments>({
      query: params => ({
        url: API_ENDPOINTS.PAYMENTS.OVERALL.INDEX,
        method: API_METHODS.GET,
        params,
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useFetchAllPaymentsGroupDateQuery,
  useLazyFetchAllPaymentsGroupDateQuery,
  useFetchPaymentsOverallQuery,
  useLazyFetchPaymentsOverallQuery,
  endpoints: paymentEndpoints,
} = paymentApi;
