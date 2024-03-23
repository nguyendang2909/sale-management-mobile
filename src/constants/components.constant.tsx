import { FC } from 'react';
import { CustomersScreen } from 'src/screens/customers/customers.screen';
import { Management } from 'src/screens/management/management';
import { OrdersScreen } from 'src/screens/orders/orders.screen';
import { ProductsScreen } from 'src/screens/products/products.screen';
import { BottomNavigatorName, HomeTabParamList } from 'src/types';

import { BOTTOM_NAVIGATOR_NAMES, PRODUCT_SORT_TYPES } from './constants';
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
    screen: Management,
    icon: NAVIGATION_ICONS.ORDER,
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
  ORDER: {
    id: BOTTOM_NAVIGATOR_NAMES.ORDER,
    name: BOTTOM_NAVIGATOR_NAMES.ORDER,
    title: 'Đơn hàng',
    screen: OrdersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  REPORT: {
    id: BOTTOM_NAVIGATOR_NAMES.REPORT,
    name: BOTTOM_NAVIGATOR_NAMES.REPORT,
    title: 'Báo cáo',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
    isShow: false,
  },
  TABLE: {
    id: BOTTOM_NAVIGATOR_NAMES.TABLE,
    name: BOTTOM_NAVIGATOR_NAMES.TABLE,
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
  CUSTOMER: {
    id: BOTTOM_NAVIGATOR_NAMES.CUSTOMER,
    name: BOTTOM_NAVIGATOR_NAMES.CUSTOMER,
    title: 'Khách hàng',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.ORDER,
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
  MESSAGE: {
    id: BOTTOM_NAVIGATOR_NAMES.MESSAGE,
    name: BOTTOM_NAVIGATOR_NAMES.MESSAGE,
    title: 'Tin nhắn',
    screen: CustomersScreen,
    icon: NAVIGATION_ICONS.WARE_HOUSE,
    isShow: false,
  },
  PRODUCT: {
    id: BOTTOM_NAVIGATOR_NAMES.PRODUCT,
    name: BOTTOM_NAVIGATOR_NAMES.PRODUCT,
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
