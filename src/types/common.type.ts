import { Alert, Text, View } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { IconTypes } from 'src/components';
import {
  AUTH_GRANT_TYPES,
  NAVIGATION_CARD_IDS_MAP,
  ORDER_STORE_STATUSES,
  PRODUCTS_SCREEN_TAB_IDS_MAP,
  SALE_STATISTIC_TIME_RANGE_IDS_MAP,
} from 'src/constants';
import { BOTTOM_NAVIGATOR_NAMES, PRODUCT_SORT_TYPES, SIZES } from 'src/constants/constants';
import { AppStackParamList } from 'src/navigators/main.stack';

import { Entity } from './entities.type';

export type ValueOf<T> = T[keyof T];

export type NearbyUserCursor = {
  excludedUserIds?: string[];
  minDistance?: number;
};

export type AuthGrantType = (typeof AUTH_GRANT_TYPES)[keyof typeof AUTH_GRANT_TYPES];

export type BottomNavigatorName = ValueOf<typeof BOTTOM_NAVIGATOR_NAMES>;

export type ProductSortType = ValueOf<typeof PRODUCT_SORT_TYPES>;

export type ProductWithQuantity = Entity.Product & { quantity: number; productId: string };

export type CartItem = {
  quantity: number;
  skuId: string;
};

export type CartItemsObj = Record<string, CartItem>;

export type Size = ValueOf<typeof SIZES>;

export type SkusObj = Record<string, Entity.Sku>;

export type ViewType = typeof View;

export type TextType = typeof Text;

export type ViewProps = ComponentProps<ViewType>;

export type AlertProps = ComponentProps<typeof Alert>;

export type TextProps = ComponentProps<TextType>;

export type OrderStoreStatus = ValueOf<typeof ORDER_STORE_STATUSES>;

export type SaleStatisticTimeRangeId = ValueOf<typeof SALE_STATISTIC_TIME_RANGE_IDS_MAP>;

export type SaleStatisticRange = {
  id: SaleStatisticTimeRangeId;
  title: string;
  getRange: (
    startDate?: string,
    endDate?: string,
  ) => {
    startDate: string;
    endDate: string;
  };
};

export type NavigationCardId =
  (typeof NAVIGATION_CARD_IDS_MAP)[keyof typeof NAVIGATION_CARD_IDS_MAP];

export type NavigationCard = {
  id: NavigationCardId;
  title: string;
  icon: IconTypes;
  screen: keyof AppStackParamList;
};

export type ProductsScreenTabId = ValueOf<typeof PRODUCTS_SCREEN_TAB_IDS_MAP>;
