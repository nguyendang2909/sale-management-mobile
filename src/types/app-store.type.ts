import { Action } from '@reduxjs/toolkit';
import { AuthorizationResult } from 'react-native-geolocation-service';
import { IMessage } from 'react-native-gifted-chat';
import { ThunkAction } from 'redux-thunk';
import { store } from 'src/store/store';

import { CartItemsObj, OrderStoreStatus, ProductSortType } from './common.type';
import { Entity } from './entities.type';
import { ApiResponse } from './fe.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppDispatch = typeof store.dispatch;

  type ProductSetting = Partial<Entity.ProductSetting>;

  type OrderSetting = Partial<Entity.OrderSetting>;

  type Shop = Entity.Shop;

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
    productSettings: ProductSetting;
    orderSettings: OrderSetting;
    isLoading: boolean;
  };

  type Cache = {
    product: {
      searchText: string;
      sortType: ProductSortType;
      isSearching: boolean;
    };
    category: {
      searchText: string;
      isSearching: boolean;
    };
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

  type Messages = Partial<{
    [T: string]: Entity.Message[];
  }>;

  type UserState = {
    swipe?: {
      data?: Entity.User[];
    };
    data?: Record<string, Entity.User>;
  };

  type Product = Entity.Product;

  type Category = Entity.Category;

  type Customer = Entity.Customer;

  type Order = Entity.Order;

  type Pagination = Partial<ApiResponse.Pagination>;

  type ShopStore = {
    data: Shop[];
    current: Shop;
  };

  type ProductStore = {
    data: Product[];
    info: {
      lastRefreshedAt?: string;
      isReachedEnd?: boolean;
    };
  };

  type OrderStore = Record<OrderStoreStatus, { data: Order[]; pagination: Pagination }> & {
    all: {
      data: Order[];
      pagination: Pagination;
    };
  };

  type CartStore = {
    items: CartItemsObj;
    settings: {
      isCalculating: boolean;
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
