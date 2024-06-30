import { Platform } from 'react-native';
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

    fetchAllProducts: builder.query<ApiResponse.Products, ApiRequest.FindAllProducts>({
      query: params => ({
        url: API_ENDPOINTS.PRODUCTS.ALL,
        method: API_METHODS.GET,
        params,
      }),
    }),

    fetchAllProductsByCategoryId: builder.query<ApiResponse.Products, string>({
      query: categoryId => ({
        url: API_ENDPOINTS.PRODUCTS.ALL,
        method: API_METHODS.GET,
        params: {
          categoryId,
        },
      }),
    }),

    fetchProducts: builder.query<ApiResponse.Products, ApiRequest.FindManyProducts>({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX,
        method: API_METHODS.GET,
      }),
    }),

    fetchProduct: builder.query<ApiResponse.Product, string>({
      query: id => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX + '/' + id,
        method: API_METHODS.GET,
      }),
    }),

    updateProduct: builder.mutation<void, { id: string; body: ApiRequest.UpdateProduct }>({
      query: ({ id, body }) => ({
        url: API_ENDPOINTS.PRODUCTS.INDEX + '/' + id,
        method: API_METHODS.PATCH,
        body,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.PRODUCTS.INDEX}/${id}`,
        method: API_METHODS.DELETE,
      }),
    }),

    uploadProductImage: builder.mutation<ApiResponse.ProductImage, ApiRequest.UploadPhoto>({
      query: body => {
        const { file } = body;
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', {
          uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        return {
          url: API_ENDPOINTS.PRODUCTS.IMAGES,
          method: API_METHODS.POST,
          body: formData,
        };
      },
    }),

    deleteProductImage: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.PRODUCTS.IMAGES}/${id}`,
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
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
  useLazyFetchProductQuery,
  useFetchAllProductsByCategoryIdQuery,
  useLazyFetchAllProductsByCategoryIdQuery,
  endpoints: productEndpoints,
} = productApi;
