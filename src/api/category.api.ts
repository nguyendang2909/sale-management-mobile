import { API_ENDPOINTS } from 'src/config/config.api';
import { API_METHODS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation<ApiResponse.Category, ApiRequest.CreateCategory>({
      query: body => ({
        url: API_ENDPOINTS.CATEGORIES.INDEX,
        method: API_METHODS.POST,
        body,
      }),
    }),

    fetchAllCategories: builder.query<ApiResponse.Categories, ApiRequest.FindAllCategories>({
      query: () => ({
        url: API_ENDPOINTS.CATEGORIES.ALL,
        method: API_METHODS.GET,
      }),
    }),

    // fetchCategories: builder.query<ApiResponse.Categories, ApiRequest.FindManyCategories>({
    //   query: () => ({
    //     url: API_ENDPOINTS.CATEGORIES.INDEX,
    //     method: API_METHODS.GET,
    //   }),
    // }),

    fetchCategory: builder.query<ApiResponse.Category, string>({
      query: () => ({
        url: API_ENDPOINTS.CATEGORIES.INDEX,
        method: API_METHODS.GET,
      }),
    }),

    updateCategory: builder.mutation<void, { id: string; payload: ApiRequest.UpdateProduct }>({
      query: params => ({
        url: API_ENDPOINTS.CATEGORIES.INDEX,
        method: API_METHODS.PUT,
        params,
      }),
    }),

    deleteCategory: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.CATEGORIES.INDEX}/${id}`,
        method: API_METHODS.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useFetchAllCategoriesQuery,
  // useFetchCategoriesQuery,
  useLazyFetchAllCategoriesQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  endpoints: categoryEndpoints,
} = categoryApi;
