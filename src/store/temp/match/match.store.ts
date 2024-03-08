import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { matchEndpoints } from 'src/api';
import { matchesService } from 'src/services';
import { ApiResponse, AppStore, Entity, SocketRequest } from 'src/types';

import { appActions } from '../app.store';

const initialState: AppStore.MatchState = {
  data: [],
  infoMatches: {
    isReachedEnd: true,
  },
  infoConversations: {
    isReachedEnd: true,
  },
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    // Matches
    addMatch: (state, { payload: { data } }: PayloadAction<ApiResponse.Match>) => {
      const match = matchesService.formatOne(data);
      state.data = matchesService.sortAndUniq([match], state.data);
    },

    unmatch: (state, { payload }: PayloadAction<{ _id: string }>) => {
      state.data = state.data.filter(e => e._id !== payload._id);
    },

    // Conversations
    updateWhenUpdateSentMessage: (state, { payload }: PayloadAction<Entity.Message>) => {
      const stateIndex = state.data.findIndex(e => e._id === payload._matchId);
      if (stateIndex >= 0) {
        state.data[stateIndex] = {
          ...state.data[stateIndex],
          lastMessage: payload,
          read: true,
        };
      }
      state.data = matchesService.sortAndUniq([], state.data);
    },

    updateWhenReceivingMessage: (state, { payload }: PayloadAction<Entity.Message>) => {
      if (!state.data?.length) {
        return;
      }
      const stateDataLength = state.data.length;
      for (let i = 0; i < stateDataLength; i += 1) {
        const stateData = state.data[i];
        if (stateData._id === payload._matchId) {
          state.data[i] = {
            ...stateData,
            lastMessage: payload,
            read: false,
          };
          return;
        }
      }
    },

    readMessage: (state, action: PayloadAction<SocketRequest.ReadMessage>) => {
      const { payload } = action;
      const matchId = payload.matchId;
      if (!state.data.length) {
        return;
      }
      const matchIndex = state.data.findIndex(item => item._id === matchId);
      if (matchIndex >= 0) {
        state.data[matchIndex].read = true;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.infoConversations = {};
      state.infoMatches = {};
    });
    builder
      .addMatcher(
        matchEndpoints.refreshMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          // TODO: improve
          // state.data = matchesService.sortAndUniq(matches, state.data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        matchEndpoints.getNewestMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          // TODO: improve
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        matchEndpoints.getNextMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        matchEndpoints.refreshConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        matchEndpoints.getNewestConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        matchEndpoints.getNextConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(matchEndpoints.unmatch.matchFulfilled, (state, { payload: { data } }) => {
        const matchId = data._id;
        if (matchId) {
          state.data = state.data.filter(e => e._id !== matchId);
        }
      })
      .addMatcher(matchEndpoints.getMatch.matchFulfilled, (state, { payload: { data } }) => {
        const match = matchesService.formatOne(data);
        state.data = matchesService.sortAndUniq([match], state.data);
      })
      .addMatcher(
        matchEndpoints.getMatchByTargetUserId.matchFulfilled,
        (state, { payload: { data } }) => {
          const match = matchesService.formatOne(data);
          state.data = matchesService.sortAndUniq([match], state.data);
        },
      );
  },
});

export const matchActions = matchSlice.actions;

export const matchSelects = {
  conversations: (state: AppStore.RootState) => {
    return state.match.data.filter(e => !!e.lastMessage);
  },
  matches: (state: AppStore.RootState) => {
    return state.match.data.filter(e => !e.lastMessage);
  },
};

export const matchReducer = matchSlice.reducer;
