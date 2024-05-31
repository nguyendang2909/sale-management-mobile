import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryEndpoints } from 'src/api';
import { AppStore, Entity } from 'src/types';
import { categoryUtil } from 'src/utils/category.util';

import { appActions } from '../app/app.store';

const initialState: AppStore.CategoryStore = {
  data: [],
  info: {},
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<Entity.Category[]>) => {
      state.data = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });

    builder
      .addMatcher(
        categoryEndpoints.fetchAllCategories.matchFulfilled,
        (state, { payload: { data } }) => {
          state.data = categoryUtil.formatManyAndSort(data, state.data);
        },
      )
      .addMatcher(
        categoryEndpoints.fetchCategory.matchFulfilled,
        (state, { payload: { data } }) => {
          console.log(111, data);
          state.data = categoryUtil.formatManyAndSort([data], state.data);
        },
      )
      .addMatcher(
        categoryEndpoints.createCategory.matchFulfilled,
        (state, { payload: { data } }) => {
          state.data = categoryUtil.formatManyAndSort([data], state.data);
        },
      );
    //   .addMatcher(
    //     likeEndpoints.getNextLikedMe.matchFulfilled,
    //     (state, { payload: { data, pagination } }) => {
    //       state.info = {
    //         ...state.info,
    //         isReachedEnd: !pagination._next,
    //       };
    //       const likes = likedMeService.formatMany(data);
    //       state.data = likedMeService.sortAndUniq(likes, state.data);
    //     },
    //   )
    //   .addMatcher(likeEndpoints.getOneLikedMe.matchFulfilled, (state, { payload: { data } }) => {
    //     const like = likedMeService.formatOne(data);
    //     state.data = state.data.map(e => {
    //       if (e._id === like._id) {
    //         return like;
    //       }
    //       return e;
    //     });
    //   });
  },
});

export const categoryActions = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
