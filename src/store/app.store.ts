import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { meEndpoints } from 'src/api/me.api';
import { ApiResponse, AppStore, Entity } from 'src/types';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  profile: {},
  user: {},
  osPermissions: {},
  socket: {
    connectedAt: moment().toISOString(),
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Entity.User>) => {
      state.profile = payload;
    },
    setProfile: (state, { payload }: PayloadAction<Entity.Profile>) => {
      state.profile = payload;
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
      state.profile = {};
      state.user = {};
      state.socket = {};
    },
    setOsLocationPermission: (state, action: PayloadAction<AuthorizationResult>) => {
      if (state.osPermissions) {
        state.osPermissions.locationService = action.payload;
      } else {
        state.osPermissions = {
          locationService: action.payload,
        };
      }
    },
    setSocketConnected: state => {
      state.socket.connectedAt = moment().toDate().toISOString();
    },
  },
  extraReducers: builder => {
    builder.addMatcher(meEndpoints.getMe.matchFulfilled, (state, { payload: { data } }) => {
      state.user = data;
    });
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
