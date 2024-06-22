import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shopEndpoints } from 'src/api';
import { AppStore, Entity } from 'src/types';

import { appActions } from '../app/app.store';

const initialState: AppStore.ShopStore = {
  shop: {
    id: '',
  },
  data: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state, { payload }: PayloadAction<Entity.Shop>) => {
      state.current = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.current = {
        id: '',
      };
    });

    builder.addMatcher(
      shopEndpoints.fetchAllShops.matchFulfilled,
      (state, { payload: { data } }) => {
        state.data = data || [];
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

export const selectCurrentShopId = (s: AppStore.RootState) => s.shop.current.id;

export const shopActions = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
