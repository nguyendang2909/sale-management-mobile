import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { AppStore, PickedOrderItem } from 'src/types';

import { appActions } from '../app/app.store';

const initialState: AppStore.CartStore = {
  items: {},
  settings: {
    isCalculating: false,
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductItem: (state, { payload: productId }: PayloadAction<string>) => {
      if (state.items[productId]) {
        state.items[productId].quantity += 1;
        return;
      }
      state.items[productId] = {
        quantity: 1,
        productId,
      };
    },
    subtractProductItem: (state, { payload: productId }: PayloadAction<string>) => {
      if (!state.items[productId]) {
        return;
      }
      if (state.items[productId].quantity === 1) {
        state.items = _.omit(state.items, productId);
        return;
      }
      state.items[productId].quantity -= 1;
    },
    deleteProductItem: (state, { payload: productId }: PayloadAction<string>) => {
      delete state.items[productId];
    },
    setProductItem: (state, { payload }: PayloadAction<PickedOrderItem>) => {
      state.items[payload.productId] = payload;
    },
    setCartItems: (state, { payload }: PayloadAction<Record<string, PickedOrderItem>>) => {
      state.items = payload;
    },
    resetCartSettings: state => {
      if (state.settings.isCalculating) {
        state.settings.isCalculating = false;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.items = {};
      state.settings.isCalculating = false;
    });
  },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
