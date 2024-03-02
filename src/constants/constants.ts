// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

import { FC } from 'react';
import { Management } from 'src/screens/management/management';
import { Products } from 'src/screens/products/products';

import { HomeTabParamList, RelationshipGoal, RelationshipStatus, TxKey } from '../types';
import { RELATIONSHIP_GOALS, RELATIONSHIP_STATUSES } from './data.constant';

// export enum ESmoking {
//   nonSmoker = 'nonSmoker',
//   smoker = 'smoker',
//   tryingToQuit = 'tryingToQuit',
// }

// export enum EWorkout {
//   everyDay = 'everyDay',
//   often = 'often',
//   sometimes = 'sometimes',
//   never = 'never',
// }

// export enum EDrinking {
//   nondrinker = 'nondrinker',
//   drinker = 'drinker',
// }

// export enum ERelationshipStatus {
//   single = 'single',
//   inLove = 'inLove',
//   married = 'married',
//   divorcedWithoutKids = 'divorcedWithoutKids',
//   divorcedWithKids = 'divorcedWithKids',
//   singleParent = 'singleParent',
// }

// export enum EUploadFileType {
//   photo = 'photo',
//   video = 'video',
// }

// export enum EUploadFileShare {
//   public = 'public',
//   Private = 'private',
// }

// TODO: Remove
export const AGES = {
  MIN: 18,
  MAX: 100,
};

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
};

export const QUERY_OPTIONS = {
  MESSAGES: {
    KEY: {
      PRIMARY: 'messages',
      SECONDARY: {
        NEWEST: 'newest',
        NEXT: 'next',
      },
    },
  },
  MATCH: {
    KEY: {
      PRIMARY: 'match',
    },
  },
  CONVERSATIONS: {
    KEY: {
      PRIMARY: 'conversations',
      SECONDARY: {
        NEWEST: 'newest',
        NEXT: 'next',
      },
    },
  },
} as const;

export const QUERY_KEYS = {
  NEARBY_USERS: {
    KEY: 'nearbyUsers',
    STALE_TIME: 10 * (6 * 1000) * 6,
  },
  PROFILE: 'profile',
  LIKED_ME: 'likedMe',
};

export const UserRoles = {
  admin: 1,
  manager: 2,
  member: 3,
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export const UserGenders = {
  male: 1,
  female: 2,
} as const;

export type UserGender = (typeof UserGenders)[keyof typeof UserGenders];

// Const
export const RELATIONSHIP_GOAL_MESSAGES: Record<RelationshipGoal, TxKey> = {
  [RELATIONSHIP_GOALS.BOY_GIRL_FRIEND]: 'Boy/Girl friend',
  [RELATIONSHIP_GOALS.GET_MARRIED]: 'Get married',
  [RELATIONSHIP_GOALS.MAKE_FRIENDS]: 'Make friends',
  [RELATIONSHIP_GOALS.ONE_NIGHT_STAND]: 'One-Night stand',
  [RELATIONSHIP_GOALS.SEX_PARTNER]: 'Sex partner',
};

export const GENDER_MESSAGES: Record<UserGender, TxKey> = {
  [UserGenders.male]: 'Male',
  [UserGenders.female]: 'Female',
};

export const RELATIONSHIP_STATUS_MESSAGES: Record<RelationshipStatus, TxKey> = {
  [RELATIONSHIP_STATUSES.DIVORCED_WITH_CHILDREN]: 'Divorced with children',
  [RELATIONSHIP_STATUSES.DIVORCED_WITHOUT_CHILDREN]: 'Divorced without children',
  [RELATIONSHIP_STATUSES.HAVE_BOY_GIRL_FRIEND]: 'Have boy/girl friend',
  [RELATIONSHIP_STATUSES.MARRIED]: 'Married',
  [RELATIONSHIP_STATUSES.SINGLE]: 'Single',
  [RELATIONSHIP_STATUSES.SINGLE_MOM_DAD]: 'Single mom/dad',
};

export const PROVIDE_TAGS = {
  ME: 'me',
  MY_PROFILE_FILTER: 'my_profile_filter',
  MY_PROFILE: 'my_profile',
  NEARBY_PROFILES: 'nearby_profiles',
} as const;

export const ARR_PROVIDE_TAGS = Object.values(PROVIDE_TAGS);

export const API_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const SIGN_IN_METHODS = {
  GOOGLE: 'google',
  PHONE_NUMBER: 'phone_number',
  APPLE: 'apple',
};

export const DEFAULT_LANGUAGE = 'en';

export const APP_NAME = 'iBán hàng';

export const NAVIGATORS = {
  MANAGEMENT: 'management',
  ORDER: 'order',
  REPORT: 'report',
  TABLE: 'table',
  SELL: 'sell',
  PAY_BOOK: 'pay_book',
  RECEIPT_AND_EXPENSE: 'receipt_and_expense',
  // ONLINE_STORE: 'online_store',
  CUSTOMER: 'customer',
  WAREHOUSE: 'warehouse',
  MESSAGE: 'message',
  PRODUCT: 'product',
} as const;

export const ARR_NAVIGATORS = [
  {
    id: NAVIGATORS.MANAGEMENT,
    name: 'MANAGEMENT',
    title: 'Quản lý',
  },
  {
    id: NAVIGATORS.ORDER,
    name: 'ORDER',
    title: 'Đơn hàng',
  },
  {
    id: NAVIGATORS.REPORT,
    name: 'REPORT',
    title: 'Báo cáo',
  },
  {
    id: NAVIGATORS.TABLE,
    name: 'TABLE',
    title: 'Bàn',
  },
  {
    id: NAVIGATORS.SELL,
    name: 'SELL',
    title: 'Bán hàng',
  },
  {
    id: NAVIGATORS.PAY_BOOK,
    name: 'PAY_BOOK',
    title: 'Sổ nợ',
  },
  {
    id: NAVIGATORS.RECEIPT_AND_EXPENSE,
    name: 'RECEIPT_AND_EXPENSE',
    title: 'Thu chi',
  },
  {
    id: NAVIGATORS.CUSTOMER,
    name: 'CUSTOMER',
    title: 'Khách hàng',
  },
  {
    id: NAVIGATORS.WAREHOUSE,
    name: 'WAREHOUSE',
    title: 'Kho hàng',
  },
  {
    id: NAVIGATORS.MESSAGE,
    name: 'MESSAGE',
    title: 'Tin nhắn',
  },
  {
    id: NAVIGATORS.PRODUCT,
    name: 'PRODUCT',
    title: 'Sản phẩm',
  },
];

export const DEFAULT_NAVIGATORS: {
  id: string;
  name: keyof HomeTabParamList;
  title: string;
  screen: FC;
}[] = [
  {
    id: NAVIGATORS.MANAGEMENT,
    name: 'MANAGEMENT',
    title: 'Quản lý',
    screen: Management,
  },
  {
    id: NAVIGATORS.PRODUCT,
    name: 'PRODUCT',
    title: 'Sản phẩm',
    screen: Products,
  },
  {
    id: NAVIGATORS.ORDER,
    name: 'ORDER',
    title: 'Đơn hàng',
    screen: Management,
  },
  {
    id: NAVIGATORS.CUSTOMER,
    name: 'CUSTOMER',
    title: 'Khách hàng',
    screen: Management,
  },
];
