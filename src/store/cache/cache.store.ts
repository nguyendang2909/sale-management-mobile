import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCT_SORT_TYPES } from 'src/constants/constants';
import { AppStore, ProductSortType } from 'src/types';

import { appActions } from '../app';

const initialState: AppStore.Cache = {
  product: {
    searchText: '',
    sortType: PRODUCT_SORT_TYPES.CUSTOM,
  },
  category: {
    searchText: '',
  },
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setProductSearchText: (state, { payload }: PayloadAction<string>) => {
      state.product.searchText = payload;
    },
    setProductSortType: (state, { payload }: PayloadAction<ProductSortType>) => {
      state.product.sortType = payload;
    },
    setCategorySearchText: (state, { payload }: PayloadAction<string>) => {
      state.category.searchText = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.product = {
        searchText: '',
        sortType: PRODUCT_SORT_TYPES.CUSTOM,
      };
    });
  },
});

export const cacheActions = cacheSlice.actions;

export const { setProductSearchText, setProductSortType, setCategorySearchText } = cacheActions;

export const cacheReducer = cacheSlice.reducer;
