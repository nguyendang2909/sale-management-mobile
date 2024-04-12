import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore, Entity } from 'src/types';

import { appActions } from '../app/app.store';

const initialState: AppStore.OrderStore = {
  data: [],
  info: {},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Entity.Product[]>) => {
      state.data = payload;
    },
    deleteProductById: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter(e => e.id !== payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
  },
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
