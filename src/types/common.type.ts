import { AUTH_GRANT_TYPES } from 'src/constants';
import { BOTTOM_NAVIGATOR_NAMES, PRODUCT_SORT_TYPES } from 'src/constants/constants';

export type ValueOf<T> = T[keyof T];

export type NearbyUserCursor = {
  excludedUserIds?: string[];
  minDistance?: number;
};

export type AuthGrantType = (typeof AUTH_GRANT_TYPES)[keyof typeof AUTH_GRANT_TYPES];

export type BottomNavigatorName = ValueOf<typeof BOTTOM_NAVIGATOR_NAMES>;

export type ProductSortType = ValueOf<typeof PRODUCT_SORT_TYPES>;
