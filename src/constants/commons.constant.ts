import _ from 'lodash';

import { ORDER_STATUSES } from './data.constant';

export const SCREENS = {
  EditInfoHeight: 'EditInfoHeight',
  EditInfoNickname: 'EditInfoNickname',
  EditInfoWeight: 'EditInfoWeight',
  DATING_NEARBY_FILTER: 'DATING_NEARBY_FILTER',
  CREATE_BASIC_PROFILE: 'CREATE_BASIC_PROFILE',
  CREATE_BASIC_PHOTOS: 'CREATE_BASIC_PHOTOS',
  Home: 'Home',
  LikedMe: 'LikedMe',
  Main: 'Main',
  Messages: 'Messages',
  ProfileEdit: 'ProfileEdit',
  ProfileNearby: 'ProfileNearby',
  ProfileSetting: 'ProfileSetting',
  SelectRelationshipGoal: 'SelectRelationshipGoal',
  SignIn: 'SignIn',
  SignInWithOtpPhoneNumber: 'SignInWithOtpPhoneNumber',
  SignInWithPhoneNumber: 'SignInWithPhoneNumber',
  Welcome: 'Welcome',
  ChatProfile: 'ChatProfile',
  LikedMeProfile: 'LikedMeProfile',
  DATING_SWIPE_PROFILE: 'DATING_SWIPE_PROFILE',
  EDIT_INFO_LOCATION: 'EDIT_INFO_LOCATION',
  SUBJECTS: 'SUBJECTS',
  SUBJECT: 'SUBJECT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  CREATE_ORDER: 'CREATE_ORDER',
  PRODUCT_SETTING: 'PRODUCT_SETTING',
  ORDER_CONFIRM: 'ORDER_CONFIRM',
} as const;

export const HOME_SCREENS = {
  MANAGEMENT: 'MANAGEMENT',
  ORDER: 'ORDER',
  REPORT: 'REPORT',
  TABLE: 'TABLE',
  SELL: 'SELL',
  PAY_BOOK: 'PAY_BOOK',
  RECEIPT_AND_EXPENSE: 'RECEIPT_AND_EXPENSE',
  // ONLINE_STORE: undefined,
  CUSTOMER: 'CUSTOMER',
  WAREHOUSE: 'WAREHOUSE',
  MESSAGE: 'MESSAGE',
  PRODUCT: 'PRODUCT',
} as const;

export const AGES = {
  MIN: 18,
  MAX: 100,
};

export const CURRENCIES = {
  VND: '₫',
} as const;

export const ORDER_TABS = {
  ..._.pick(ORDER_STATUSES, [
    'WAIT_TO_CONFIRM',
    'PROCESSING',
    'DELIVERED',
    'RETURNED',
    'CANCELLED',
  ]),
  ALL: 'all',
};
