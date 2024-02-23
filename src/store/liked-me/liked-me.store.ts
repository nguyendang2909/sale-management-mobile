import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { likeEndpoints } from 'src/api';
import { likedMeService } from 'src/services';
import { AppStore } from 'src/types';

import { appActions } from '../app.store';

const initialState: AppStore.LikedMeState = {
  data: [],
  info: {},
};

export const likedMeSlice = createSlice({
  name: 'likedMe',
  initialState,
  reducers: {
    removeOneByUserId: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter(e => e.profile?._id !== payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });

    builder
      .addMatcher(
        likeEndpoints.refreshLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const likes = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(likes, state.data);
        },
      )
      .addMatcher(
        likeEndpoints.getNewestLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        likeEndpoints.getNextLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
          };
          const likes = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(likes, state.data);
        },
      )
      .addMatcher(likeEndpoints.getOneLikedMe.matchFulfilled, (state, { payload: { data } }) => {
        const like = likedMeService.formatOne(data);
        state.data = state.data.map(e => {
          if (e._id === like._id) {
            return like;
          }
          return e;
        });
      });
  },
});

export const likedMeActions = likedMeSlice.actions;

export const likedMeReducer = likedMeSlice.reducer;
