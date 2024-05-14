import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_STORE_STATUS_ARR } from 'src/constants';
import { AppStore, Entity, OrderStoreStatus } from 'src/types';
import { orderUtil } from 'src/utils';

import { appActions } from '../app/app.store';

const initialState: AppStore.OrderStore = {
  data: [],
  unconfirmed: {
    data: [],
  },
  processing: {
    data: [],
  },
  delivered: {
    data: [],
  },
  returned: {
    data: [],
  },
  cancelled: {
    data: [],
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (
      state,
      { payload: { data, type } }: PayloadAction<{ data: Entity.Order[]; type?: OrderStoreStatus }>,
    ) => {
      const formattedData = orderUtil.formatManyAndSort(data, []);
      if (type) {
        state[type].data = formattedData;
        return;
      }
      state.data = formattedData;
    },
    addOrders: (
      state,
      { payload: { data, type } }: PayloadAction<{ data: Entity.Order[]; type?: OrderStoreStatus }>,
    ) => {
      const formattedData = orderUtil.formatManyAndSort(data, state.data);
      if (type) {
        state[type].data = formattedData;
        return;
      }
      state.data = formattedData;
    },
    deleteOrder(state, { payload: id }: PayloadAction<string>) {
      ORDER_STORE_STATUS_ARR.forEach(type => {
        state[type].data = orderUtil.deleteFromArrById(id, state[type].data);
      });
      state.data = orderUtil.deleteFromArrById(id, state.data);
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.unconfirmed = { data: [] };
      state.processing = { data: [] };
      state.delivered = { data: [] };
      state.returned = { data: [] };
      state.cancelled = { data: [] };
    });
  },
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
