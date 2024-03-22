import { Action } from '@reduxjs/toolkit';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { IMessage } from 'react-native-gifted-chat';
import { ThunkAction } from 'redux-thunk';
import { store } from 'src/store/store';

import { ProductSortType } from './common.type';
import { Entity } from './entities.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppDispatch = typeof store.dispatch;

  type Setting = Partial<Entity.Setting>;

  type AppState = {
    accessToken?: string;
    refreshToken?: string;
    isLogged?: boolean;
    user: Partial<Entity.User>;
    osPermissions?: {
      locationService?: AuthorizationResult;
    };
    socket: {
      connectedAt?: string;
    };
    settings: Setting;
  };

  type Cache = {
    product: {
      searchText: string;
      sortType: ProductSortType;
    };
    category: {
      searchText: string;
    };
  };

  type ConversationState = {
    data: AppStore.Match[];
  };

  type Match = Entity.Match & {
    lastRefreshedAt: string;
  };

  type View = Entity.View & {
    lastRefreshedAt: string;
  };

  type ChatMessage = IMessage & { uuid?: string };

  type MessageState = {
    data: Record<string, ChatMessage[] | undefined>;
    info: Record<
      string,
      {
        lastRefreshedAt?: string;
        isReachedEnd?: boolean;
      }
    >;
  };

  type MatchState = {
    data: Match[];
    infoMatches: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
    infoConversations: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type Messages = Partial<{
    [T: string]: Entity.Message[];
  }>;

  type UserState = {
    swipe?: {
      data?: Entity.User[];
    };
    data?: Record<string, Entity.User>;
  };

  type NearbyState = {
    data: Entity.Profile[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type SwipeProfileState = {
    data: Entity.Profile[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type Product = Entity.Product;

  type Category = Entity.Category;

  type Customer = Entity.Customer;

  type ProductStore = {
    data: Product[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type CategoryStore = {
    data: Category[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type CustomerStore = {
    data: Customer[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type PhotoActionType = 'delete' | 'create' | undefined;

  type PhotoAction = {
    type?: PhotoActionType;
    _id?: string;
  };

  type Settings = {
    photo: {
      action: PhotoAction;
    };
  };
}

export type AppThunkAction = ThunkAction<void, AppStore.RootState, unknown, Action>;
