import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { AppStore, CartItem, CartItemsObj } from 'src/types';

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
    addCartItem: (state, { payload: skuId }: PayloadAction<string>) => {
      if (state.items[skuId]) {
        state.items[skuId].quantity += 1;
        return;
      }
      state.items[skuId] = {
        quantity: 1,
        skuId,
      };
    },
    subtractCartItem: (state, { payload: skuId }: PayloadAction<string>) => {
      if (!state.items[skuId]) {
        return;
      }
      if (state.items[skuId].quantity === 1) {
        state.items = _.omit(state.items, skuId);
        return;
      }
      state.items[skuId].quantity -= 1;
    },
    deleteCartItem: (state, { payload: skuId }: PayloadAction<string>) => {
      delete state.items[skuId];
    },
    setCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      state.items[payload.skuId] = payload;
    },
    setCartItems: (state, { payload }: PayloadAction<CartItemsObj>) => {
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
