import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { settingEndpoints } from 'src/api';
import { meEndpoints } from 'src/api/me.api';
import { ApiResponse, AppStore, Entity } from 'src/types';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: {},
  socket: {
    connectedAt: moment().toISOString(),
  },
  settings: {},
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
      state.settings = {};
    },
    setSocketConnected: state => {
      state.socket.connectedAt = moment().toDate().toISOString();
    },
  },
  extraReducers: builder => {
    builder.addMatcher(meEndpoints.fetchMe.matchFulfilled, (state, { payload: { data } }) => {
      state.user = data;
    });
    builder.addMatcher(
      settingEndpoints.fetchSettings.matchFulfilled,
      (state, { payload: { data } }) => {
        state.settings = data;
      },
    );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
