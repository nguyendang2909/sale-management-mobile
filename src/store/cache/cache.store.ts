import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCT_SORT_TYPES } from 'src/constants/constants';
import { AppStore, FormParams, ProductSortType } from 'src/types';

import { appActions } from '../app';

const initialState: AppStore.Cache = {
  product: {
    searchText: '',
    sortType: PRODUCT_SORT_TYPES.CUSTOM,
    isSearching: false,
  },
  category: {
    searchText: '',
    isSearching: false,
  },
  forms: {
    createProduct: undefined,
  },
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    // Products
    setProductSearchText: (state, { payload }: PayloadAction<string>) => {
      if (state.product.searchText !== payload) {
        state.product.searchText = payload;
      }
    },
    setSearchProducts: (state, { payload }: PayloadAction<boolean>) => {
      if (state.product.isSearching !== payload) {
        state.product.isSearching = payload;
      }
      if (!payload && state.product.searchText) {
        state.product.searchText = '';
      }
    },
    setProductSortType: (state, { payload }: PayloadAction<ProductSortType>) => {
      state.product.sortType = payload;
    },

    // Categories
    setCategorySearchText: (state, { payload }: PayloadAction<string>) => {
      if (state.category.searchText !== payload) {
        state.category.searchText = payload;
      }
    },
    setSearchCategories: (state, { payload }: PayloadAction<boolean>) => {
      if (state.category.isSearching !== payload) {
        state.category.isSearching = payload;
      }
      if (!payload && state.category.searchText) {
        state.category.searchText = '';
      }
    },
    setCreateProduct: (state, { payload }: PayloadAction<FormParams.CreateProduct | undefined>) => {
      state.forms.createProduct = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.product = {
        searchText: '',
        sortType: PRODUCT_SORT_TYPES.CUSTOM,
        isSearching: false,
      };
      state.category = {
        searchText: '',
        isSearching: false,
      };
    });
  },
});

export const cacheActions = cacheSlice.actions;

export const {
  setSearchProducts,
  setProductSearchText,
  setProductSortType,
  setCategorySearchText,
  setSearchCategories,
  setCreateProduct,
} = cacheActions;

export const cacheReducer = cacheSlice.reducer;
