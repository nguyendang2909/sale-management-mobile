import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { orderSettingEndpoints, productSettingEndpoints } from 'src/api';
import { meEndpoints } from 'src/api/me.api';
import { DEFAULT_ORDER_SETTINGS, DEFAULT_PRODUCT_SETTINGS } from 'src/constants';
import { ApiResponse, AppStore, Entity } from 'src/types';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: {},
  socket: {
    connectedAt: moment().toISOString(),
  },
  productSettings: DEFAULT_PRODUCT_SETTINGS,
  orderSettings: DEFAULT_ORDER_SETTINGS,
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Entity.User>) => {
      state.user = payload;
    },

    updateAccessToken: (state, { payload }: PayloadAction<ApiResponse.Tokens>) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken;
      }
      if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
      }
    },

    logout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = {};
      state.socket = {};
      state.productSettings = DEFAULT_PRODUCT_SETTINGS;
      state.orderSettings = DEFAULT_ORDER_SETTINGS;
      // state.orderInvoiceSettings = DEFAULT_ORDER_INVOICE_SETTINGS;
      state.isLoading = false;
    },

    setSocketConnected: state => {
      state.socket.connectedAt = moment().toDate().toISOString();
    },

    updateProductSettings: (
      state,
      { payload }: PayloadAction<Partial<AppStore.ProductSetting>>,
    ) => {
      state.productSettings = { ...state.productSettings, ...payload };
    },

    updateOrderSettings: (state, { payload }: PayloadAction<Partial<AppStore.OrderSetting>>) => {
      state.orderSettings = { ...state.orderSettings, ...payload };
    },

    setAppLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(meEndpoints.fetchMe.matchFulfilled, (state, { payload: { data } }) => {
      state.user = data;
    });
    builder.addMatcher(
      productSettingEndpoints.fetchProductSettings.matchFulfilled,
      (state, { payload: { data } }) => {
        state.productSettings = data;
      },
    );
    builder.addMatcher(
      orderSettingEndpoints.fetchOrderSettings.matchFulfilled,
      (state, { payload: { data } }) => {
        state.orderSettings = data;
      },
    );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
