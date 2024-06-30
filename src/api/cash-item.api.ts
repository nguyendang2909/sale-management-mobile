import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const cashItemApi = api.injectEndpoints({
  endpoints: builder => ({
    createCashItem: builder.mutation<ApiResponse.Product, ApiRequest.CreateCashItem>({
      query: body => ({
        url: API_ENDPOINTS.CASH_ITEMS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),
  }),
});

export const { useCreateCashItemMutation, endpoints: cashItemEndpoints } = cashItemApi;
