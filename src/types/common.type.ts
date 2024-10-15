import { Actionsheet, Alert, Modal as Dialog, Text, View } from '@gluestack-ui/themed';
import { SubscriptionOptions } from '@reduxjs/toolkit/query';
import { ComponentProps } from 'react';
import { IconTypes } from 'src/components';
import {
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

export type BottomNavigatorName = ValueOf<typeof BOTTOM_NAVIGATOR_NAMES>;

export type ProductSortType = ValueOf<typeof PRODUCT_SORT_TYPES>;

export type ProductWithQuantity = Entity.Product & { quantity: number; productId: string };

export type CartItem = {
  quantity: number;
  variantId: string;
  productId: string;
};

export type CartItemsObj = Record<string, CartItem>;

export type Size = ValueOf<typeof SIZES>;

export type VariantsMap = Record<string, Entity.ProductVariant & { product: Entity.Product }>;

export type ViewType = typeof View;

export type TextType = typeof Text;

export type ActionsheetType = typeof Actionsheet;

export type ViewProps = ComponentProps<ViewType>;

export type ActionsheetProps = ComponentProps<ActionsheetType>;

export type AlertProps = ComponentProps<typeof Alert>;

export type TextProps = ComponentProps<TextType>;

export type DialogProps = ComponentProps<typeof Dialog>;

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

export type UseQuerySubscriptionOptions = SubscriptionOptions & {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When `skip` is true (or `skipToken` is passed in as `arg`):
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta no-transpile title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean;
  /**
   * Defaults to `false`. This setting allows you to control whether if a cached result is already available, RTK Query will only serve a cached result, or if it should `refetch` when set to `true` or if an adequate amount of time has passed since the last successful query result.
   * - `false` - Will not cause a query to be performed _unless_ it does not exist yet.
   * - `true` - Will always refetch when a new subscriber to a query is added. Behaves the same as calling the `refetch` callback or passing `forceRefetch: true` in the action creator.
   * - `number` - **Value is in seconds**. If a number is provided and there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp, and only refetch if enough time has elapsed.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   */
  refetchOnMountOrArgChange?: boolean | number;
};

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
