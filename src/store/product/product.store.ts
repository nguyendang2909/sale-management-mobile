import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productEndpoints } from 'src/api';
import { AppStore, Entity } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { appActions } from '../app/app.store';

const initialState: AppStore.ProductStore = {
  data: [],
  info: {},
};

export const productSlice = createSlice({
  name: 'product',
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

    builder
      .addMatcher(
        productEndpoints.fetchAllProducts.matchFulfilled,
        (state, { payload: { data } }) => {
          state.data = productUtil.formatManyAndSort(data, []);
        },
      )
      .addMatcher(productEndpoints.fetchProduct.matchFulfilled, (state, { payload: { data } }) => {
        state.data = productUtil.formatManyAndSort([data], state.data);
      })
      .addMatcher(productEndpoints.createProduct.matchFulfilled, (state, { payload: { data } }) => {
        state.data = productUtil.formatManyAndSort([data], state.data);
      });

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

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
