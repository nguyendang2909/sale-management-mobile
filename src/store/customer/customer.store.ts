import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customersEndpoints } from 'src/api';
import { AppStore, Entity } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { appActions } from '../app/app.store';

const initialState: AppStore.CustomerStore = {
  data: [],
  info: {},
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, { payload }: PayloadAction<Entity.Customer[]>) => {
      state.data = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });

    builder
      .addMatcher(
        customersEndpoints.fetchAllCustomers.matchFulfilled,
        (state, { payload: { data } }) => {
          state.data = productUtil.formatManyAndSort(data, state.data);
        },
      )
      .addMatcher(
        customersEndpoints.createCustomer.matchFulfilled,
        (state, { payload: { data } }) => {
          state.data = productUtil.formatManyAndSort([data], state.data);
        },
      );
  },
});

export const customerActions = customerSlice.actions;

export const customerReducer = customerSlice.reducer;
