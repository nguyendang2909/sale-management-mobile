// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
};

// export const QUERY_OPTIONS = {
//   MESSAGES: {
//     KEY: {
//       PRIMARY: 'messages',
//       SECONDARY: {
//         NEWEST: 'newest',
//         NEXT: 'next',
//       },
//     },
//   },
//   MATCH: {
//     KEY: {
//       PRIMARY: 'match',
//     },
//   },
//   CONVERSATIONS: {
//     KEY: {
//       PRIMARY: 'conversations',
//       SECONDARY: {
//         NEWEST: 'newest',
//         NEXT: 'next',
//       },
//     },
//   },
// } as const;

// export const QUERY_KEYS = {
//   NEARBY_USERS: {
//     KEY: 'nearbyUsers',
//     STALE_TIME: 10 * (6 * 1000) * 6,
//   },
//   PROFILE: 'profile',
//   LIKED_ME: 'likedMe',
// };

export const PROVIDE_TAGS = {
  ME: 'me',
  SETTING: 'setting',
} as const;

export const ARR_PROVIDE_TAGS = Object.values(PROVIDE_TAGS);

export const API_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
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
