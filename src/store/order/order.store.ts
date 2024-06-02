import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderEndpoints } from 'src/api';
import { ORDER_STORE_STATUS_ARR } from 'src/constants';
import { AppStore, Entity, OrderStoreStatus } from 'src/types';
import { orderUtil } from 'src/utils';

import { appActions } from '../app/app.store';

const initialState: AppStore.OrderStore = {
  all: {
    data: [],
    pagination: {},
  },
  unconfirmed: {
    data: [],
    pagination: {},
  },
  processing: {
    data: [],
    pagination: {},
  },
  delivered: {
    data: [],
    pagination: {},
  },
  returned: {
    data: [],
    pagination: {},
  },
  cancelled: {
    data: [],
    pagination: {},
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (
      state,
      {
        payload: { data, status },
      }: PayloadAction<{ data: Entity.Order[]; status?: OrderStoreStatus }>,
    ) => {
      if (status) {
        state[status].data = orderUtil.formatManyAndSort(data, []);
        return;
      }
      state.all.data = orderUtil.formatManyAndSort(data, []);
    },
    // addOrder: (state, { payload }: PayloadAction<Entity.Order>) => {
    //   if (payload.status) {
    //     state[payload.status].data = orderUtil.formatManyAndSort(
    //       [payload],
    //       state[payload.status].data,
    //     );
    //   }
    //   state.all.data = orderUtil.formatManyAndSort([payload], state.all.data);
    // },
    deleteOrder(state, { payload: id }: PayloadAction<string>) {
      ORDER_STORE_STATUS_ARR.forEach(status => {
        state[status].data = orderUtil.deleteFromArrById(id, state[status].data);
      });
      state.all.data = orderUtil.deleteFromArrById(id, state.all.data);
    },
    setPagination: (
      state,
      {
        payload: { pagination, status },
      }: PayloadAction<{ pagination: AppStore.Pagination; status?: OrderStoreStatus }>,
    ) => {
      if (status) {
        state[status].pagination._next = pagination._next;
        return;
      }
      state.all.pagination._next = pagination._next;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(appActions.logout, state => {
        state.all = { data: [], pagination: {} };
        state.unconfirmed = { data: [], pagination: {} };
        state.processing = { data: [], pagination: {} };
        state.delivered = { data: [], pagination: {} };
        state.returned = { data: [], pagination: {} };
        state.cancelled = { data: [], pagination: {} };
      })
      .addMatcher(orderEndpoints.fetchOrder.matchFulfilled, (state, { payload: { data } }) => {
        if (data.status && state[data.status]) {
          state[data.status].data = orderUtil.formatManyAndSort([data], state[data.status].data);
        }
        state.all.data = orderUtil.formatManyAndSort([data], state.all.data);
      });
  },
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
