import _ from 'lodash';

import { ORDER_PAYMENT_METHODS, ORDER_STATUSES } from './data.constant';

export const SCREENS = {
  EditInfoHeight: 'EditInfoHeight',
  EditInfoNickname: 'EditInfoNickname',
  EditInfoWeight: 'EditInfoWeight',
  DATING_NEARBY_FILTER: 'DATING_NEARBY_FILTER',
  CREATE_BASIC_PROFILE: 'CREATE_BASIC_PROFILE',
  CREATE_BASIC_PHOTOS: 'CREATE_BASIC_PHOTOS',
  HOME: 'HOME',
  LikedMe: 'LikedMe',
  Main: 'Main',
  Messages: 'Messages',
  ProfileEdit: 'ProfileEdit',
  ProfileNearby: 'ProfileNearby',
  ProfileSetting: 'ProfileSetting',
  SelectRelationshipGoal: 'SelectRelationshipGoal',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_WITH_OTP_PHONE_NUMBER: 'SIGN_IN_WITH_OTP_PHONE_NUMBER',
  SIGN_IN_WITH_PHONE_NUMBER: 'SIGN_IN_WITH_PHONE_NUMBER',
  Welcome: 'Welcome',
  ChatProfile: 'ChatProfile',
  LikedMeProfile: 'LikedMeProfile',
  DATING_SWIPE_PROFILE: 'DATING_SWIPE_PROFILE',
  EDIT_INFO_LOCATION: 'EDIT_INFO_LOCATION',
  SUBJECTS: 'SUBJECTS',
  SUBJECT: 'SUBJECT',
  PRODUCT_CREATE: 'PRODUCT_CREATE',
  PRODUCT: 'PRODUCT',
  ORDER_CREATE: 'ORDER_CREATE',
  PRODUCT_SETTING: 'PRODUCT_SETTING',
  ORDER_SETTING: 'ORDER_SETTING',
  ORDER_CONFIRM: 'ORDER_CONFIRM',
  ORDER: 'ORDER',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  PROFILE: 'PROFILE',
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
