import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { orderSettingEndpoints, productSettingEndpoints } from 'src/api';
import { meEndpoints } from 'src/api/me.api';
import { shopEndpoints } from 'src/api/shop.api';
import { ApiResponse, AppStore, Entity } from 'src/types';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: {},
  shop: {},
  shops: [],
  socket: {
    connectedAt: moment().toISOString(),
  },
  productSettings: {},
  orderSettings: {},
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Entity.User>) => {
      state.user = payload;
    },

    setShop: (state, { payload }: PayloadAction<Entity.Shop>) => {
      state.shop = payload;
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
      state.productSettings = {};
      state.shop = {};
      state.shops = [];
      state.orderSettings = {};
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
    builder.addMatcher(
      shopEndpoints.fetchAllShops.matchFulfilled,
      (state, { payload: { data } }) => {
        if (data.length === 1) {
          state.shop = data[0];
        }
        state.shops = data;
      },
    );
    // builder.addMatcher()
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
