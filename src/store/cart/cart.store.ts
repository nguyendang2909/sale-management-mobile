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
    addCartItem: (state, { payload }: PayloadAction<{ productId: string; variantId: string }>) => {
      const { variantId } = payload;
      if (state.items[variantId]) {
        state.items[variantId].quantity += 1;
        return;
      }
      state.items[variantId] = {
        quantity: 1,
        variantId,
        productId: payload.productId,
      };
    },
    subtractCartItem: (state, { payload: variantId }: PayloadAction<string>) => {
      if (!state.items[variantId]) {
        return;
      }
      if (state.items[variantId].quantity === 1) {
        state.items = _.omit(state.items, variantId);
        return;
      }
      state.items[variantId].quantity -= 1;
    },
    deleteCartItem: (state, { payload: variantId }: PayloadAction<string>) => {
      delete state.items[variantId];
    },
    setCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      state.items[payload.variantId] = payload;
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
