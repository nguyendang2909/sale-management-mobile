import { AUTH_GRANT_TYPES } from 'src/constants';
import { BOTTOM_NAVIGATOR_NAMES, PRODUCT_SORT_TYPES } from 'src/constants/constants';

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

export type PickedOrderItem = {
  productId: string;
  quantity: number;
};

export type PickedOrderItems = Record<string, PickedOrderItem>;
