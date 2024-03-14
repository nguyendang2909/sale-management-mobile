import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const customerApi = api.injectEndpoints({
  endpoints: builder => ({
    createCustomer: builder.mutation<ApiResponse.Customer, ApiRequest.CreateCustomer>({
      query: body => ({
        url: API_ENDPOINTS.CUSTOMERS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),

    fetchAllCustomers: builder.query<ApiResponse.Products, ApiRequest.FindAllCustomers>({
      query: () => ({
        url: API_ENDPOINTS.CUSTOMERS.ALL,
        method: API_METHODS.GET,
      }),
    }),

    fetchCustomer: builder.query<ApiResponse.Customer, string>({
      query: id => ({
        url: `${API_ENDPOINTS.CUSTOMERS}/${id}`,
        method: API_METHODS.GET,
      }),
    }),

    updateCustomer: builder.mutation<void, { id: string; payload: ApiRequest.UpdateCustomer }>({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINTS.CUSTOMERS.INDEX}/${id}`,
        method: API_METHODS.PATCH,
        body,
      }),
    }),

    deleteCustomer: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.CUSTOMERS.INDEX}/${id}`,
        method: API_METHODS.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useFetchAllCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useFetchCustomerQuery,
  endpoints: customersEndpoints,
} = customerApi;
