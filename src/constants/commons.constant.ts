import _ from 'lodash';
import { AppStackParamList } from 'src/navigators/main.stack';

import { ORDER_PAYMENT_METHODS, ORDER_STATUSES } from './data.constant';

export const SCREENS: Record<keyof AppStackParamList, keyof AppStackParamList> = {
  CREATE_BASIC_PROFILE: 'CREATE_BASIC_PROFILE',
  CREATE_BASIC_PHOTOS: 'CREATE_BASIC_PHOTOS',
  HOME: 'HOME',
  SHOPS: 'SHOPS',
  SETTINGS: 'SETTINGS',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_WITH_OTP_PHONE_NUMBER: 'SIGN_IN_WITH_OTP_PHONE_NUMBER',
  SIGN_IN_WITH_PHONE_NUMBER: 'SIGN_IN_WITH_PHONE_NUMBER',
  Welcome: 'Welcome',
  PRODUCT_CREATE: 'PRODUCT_CREATE',
  PRODUCT: 'PRODUCT',
  ORDER_CREATE: 'ORDER_CREATE',
  PRODUCT_SETTING: 'PRODUCT_SETTING',
  ORDER_SETTING: 'ORDER_SETTING',
  ORDER_CONFIRM: 'ORDER_CONFIRM',
  ORDER: 'ORDER',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  AUTH_PROFILE: 'AUTH_PROFILE',
  CATEGORY: 'CATEGORY',
  CATEGORY_PICK_PRODUCTS: 'CATEGORY_PICK_PRODUCTS',
  CATEGORY_DELETE_PRODUCTS: 'CATEGORY_DELETE_PRODUCTS',
  CATEGORY_ADD_PRODUCTS: 'CATEGORY_ADD_PRODUCTS',
  // Reports
  SALE_REPORTS: 'SALE_REPORTS',
  REPORTS_CHILD: 'REPORTS_CHILD',
  ORDERS_CHILD: 'ORDERS_CHILD',
  CUSTOMER: 'CUSTOMER',
} as const;

export const HOME_SCREENS = {
  MANAGEMENT: 'MANAGEMENT',
  ORDERS: 'ORDERS',
  REPORTS: 'REPORTS',
  TABLES: 'TABLES',
  SELL: 'SELL',
  PAY_BOOK: 'PAY_BOOK',
  RECEIPT_AND_EXPENSE: 'RECEIPT_AND_EXPENSE',
  // ONLINE_STORE: undefined,
  CUSTOMERS: 'CUSTOMERS',
  WAREHOUSE: 'WAREHOUSE',
  MESSAGES: 'MESSAGES',
  PRODUCTS: 'PRODUCTS',
} as const;

export const DEFAULT_HOME_SCREEN = HOME_SCREENS.PRODUCTS;

export const AGES = {
  MIN: 18,
  MAX: 100,
};

export const CURRENCIES = {
  VND: '₫',
} as const;

export const ORDER_TABS = {
  ..._.pick(ORDER_STATUSES, ['UNCONFIRMED', 'PROCESSING', 'DELIVERED', 'RETURNED', 'CANCELLED']),
  ALL: 'all',
} as const;

export const ORDER_PAYMENT_METHOD_ARR = Object.values(ORDER_PAYMENT_METHODS);
