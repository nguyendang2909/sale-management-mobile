import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    createProduct: builder.mutation<ApiResponse.Product, ApiRequest.CreateProduct>({
      query: body => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),

    fetchAllProducts: builder.query<ApiResponse.Products, ApiRequest.FindManyProducts>({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS.ALL,
        method: API_METHODS.GET,
      }),
    }),

    fetchProducts: builder.query<ApiResponse.Products, ApiRequest.FindManyProducts>({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX,
        method: API_METHODS.GET,
      }),
    }),

    fetchProduct: builder.query<ApiResponse.Product, string>({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX,
        method: API_METHODS.GET,
      }),
    }),

    updateProduct: builder.mutation<void, { id: string; payload: ApiRequest.UpdateProduct }>({
      query: params => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX,
        method: API_METHODS.PUT,
        params,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.PRODUCTS.INDEX}/${id}`,
        method: API_METHODS.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useFetchAllProductsQuery,
  useFetchProductsQuery,
  useFetchProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  endpoints: productEndpoints,
} = productApi;
