import { FC } from 'react';
import { HomeTabParamList } from 'src/navigators/home-navigator';
import { CustomersScreen } from 'src/screens/customers/customers.screen';
import { ManagementScreen } from 'src/screens/management/management.screen';
import { OrdersScreen } from 'src/screens/orders/orders.screen';
import { ProductsScreen } from 'src/screens/products/products.screen';
import { ReportsScreen } from 'src/screens/reports/reports.screen';
import { BottomNavigatorName, NavigationCard, NavigationCardId } from 'src/types';

import { SCREENS } from './commons.constant';
import { BOTTOM_NAVIGATOR_NAMES, NAVIGATION_CARD_IDS_MAP, PRODUCT_SORT_TYPES } from './constants';
import { NAVIGATION_ICONS } from './icons.constant';

export const DEFAULT_NAVIGATOR: {
  id: string;
  name: keyof HomeTabParamList;
  title: string;
  screen: FC;
  icon: FC;
  isShow: true;
}[] = [
  {
    id: 'MANAGEMENT',
    name: 'MANAGEMENT',
    title: 'Quản lý',
    screen: ManagementScreen,
    icon: NAVIGATION_ICONS.MANAGEMENT,
    isShow: true,
  },
];

export const NAVIGATOR_DATA: Record<
  BottomNavigatorName,
  {
    id: string;
    name: keyof HomeTabParamList;
    title: string;
    screen: FC;
    icon: FC;
    isShow: boolean;
  }
> = {
  ORDERS: {
    id: BOTTOM_NAVIGATOR_NAMES.ORDERS,
    name: BOTTOM_NAVIGATOR_NAMES.ORDERS,
    title: 'Đơn hàng',
    screen: OrdersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  REPORTS: {
    id: BOTTOM_NAVIGATOR_NAMES.REPORTS,
    name: BOTTOM_NAVIGATOR_NAMES.REPORTS,
    title: 'Báo cáo',
    screen: ReportsScreen,
    icon: NAVIGATION_ICONS.REPORTS,
    isShow: false,
  },
  TABLES: {
    id: BOTTOM_NAVIGATOR_NAMES.TABLES,
    name: BOTTOM_NAVIGATOR_NAMES.TABLES,
    title: 'Bàn',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  SELL: {
    id: BOTTOM_NAVIGATOR_NAMES.SELL,
    name: BOTTOM_NAVIGATOR_NAMES.SELL,
    title: 'Bán hàng',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  DEBT_BOOK: {
    id: BOTTOM_NAVIGATOR_NAMES.DEBT_BOOK,
    name: BOTTOM_NAVIGATOR_NAMES.DEBT_BOOK,
    title: 'Sổ nợ',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  RECEIPT_AND_EXPENSE: {
    id: BOTTOM_NAVIGATOR_NAMES.RECEIPT_AND_EXPENSE,
    name: BOTTOM_NAVIGATOR_NAMES.RECEIPT_AND_EXPENSE,
    title: 'Thu chi',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  CUSTOMERS: {
    id: BOTTOM_NAVIGATOR_NAMES.CUSTOMERS,
    name: BOTTOM_NAVIGATOR_NAMES.CUSTOMERS,
    title: 'Khách hàng',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.CUSTOMER,
    isShow: false,
  },
  WAREHOUSE: {
    id: BOTTOM_NAVIGATOR_NAMES.WAREHOUSE,
    name: BOTTOM_NAVIGATOR_NAMES.WAREHOUSE,
    title: 'Kho hàng',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.WARE_HOUSE,
    isShow: false,
  },
  MESSAGES: {
    id: BOTTOM_NAVIGATOR_NAMES.MESSAGES,
    name: BOTTOM_NAVIGATOR_NAMES.MESSAGES,
    title: 'Tin nhắn',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.WARE_HOUSE,
    isShow: false,
  },
  PRODUCTS: {
    id: BOTTOM_NAVIGATOR_NAMES.PRODUCTS,
    name: BOTTOM_NAVIGATOR_NAMES.PRODUCTS,
    title: 'Sản phẩm',
    screen: ProductsScreen,
    icon: NAVIGATION_ICONS.PRODUCT,
    isShow: false,
  },
} as const;

export const PRODUCT_SORT_TYPE_DATA = [
  {
    id: PRODUCT_SORT_TYPES.CUSTOM,
    type: PRODUCT_SORT_TYPES.CUSTOM,
    title: 'Tuỳ chỉnh',
  },
  {
    id: PRODUCT_SORT_TYPES.IN_STOCK_ASC,
    type: PRODUCT_SORT_TYPES.IN_STOCK_ASC,
    title: 'Còn hàng từ A -> Z',
  },
  {
    id: PRODUCT_SORT_TYPES.IN_STOCK_DESC,
    type: PRODUCT_SORT_TYPES.IN_STOCK_DESC,
    title: 'Còn hàng từ Z -> A',
  },
  {
    id: PRODUCT_SORT_TYPES.TITLE_ASC,
    type: PRODUCT_SORT_TYPES.TITLE_ASC,
    title: 'Từ A -> Z',
  },
  {
    id: PRODUCT_SORT_TYPES.TITLE_DESC,
    type: PRODUCT_SORT_TYPES.TITLE_DESC,
    title: 'Từ Z -> A',
  },
  {
    id: PRODUCT_SORT_TYPES.PRICE_ASC,
    type: PRODUCT_SORT_TYPES.PRICE_ASC,
    title: 'Giá từ thấp đến cao',
  },
  {
    id: PRODUCT_SORT_TYPES.PRICE_DESC,
    type: PRODUCT_SORT_TYPES.PRICE_DESC,
    title: 'Giá từ cao đến thấp',
  },
  {
    id: PRODUCT_SORT_TYPES.NEWEST,
    type: PRODUCT_SORT_TYPES.NEWEST,
    title: 'Mới nhất',
  },
  {
    id: PRODUCT_SORT_TYPES.OLDEST,
    type: PRODUCT_SORT_TYPES.OLDEST,
    title: 'Cũ nhất',
  },
];

export const NAVIGATION_CARDS_MAP: Record<NavigationCardId, NavigationCard> = {
  [NAVIGATION_CARD_IDS_MAP.ORDERS]: {
    id: NAVIGATION_CARD_IDS_MAP.ORDERS,
    title: 'Đơn hàng',
    icon: 'fastDelivery',
    screen: SCREENS.ORDERS_CHILD,
  },
  [NAVIGATION_CARD_IDS_MAP.PRODUCTS]: {
    id: NAVIGATION_CARD_IDS_MAP.PRODUCTS,
    title: 'Sản phẩm',
    icon: 'store',
    screen: SCREENS.ORDERS_CHILD,
  },
  [NAVIGATION_CARD_IDS_MAP.REPORTS]: {
    id: NAVIGATION_CARD_IDS_MAP.REPORTS,
    title: 'Báo cáo',
    icon: 'barChart',
    screen: SCREENS.REPORTS_CHILD,
  },
  [NAVIGATION_CARD_IDS_MAP.TABLES]: {
    id: NAVIGATION_CARD_IDS_MAP.TABLES,
    title: 'Thu tiền nhanh',
    icon: 'fastDelivery',
    screen: SCREENS.ORDERS_CHILD,
  },
};

export const NAVIGATION_CARDS = Object.values(NAVIGATION_CARDS_MAP);
