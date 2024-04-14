// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

import { OrderSettingKey, ProductSettingKey } from 'src/types';

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

export const BOTTOM_NAVIGATOR_NAMES = {
  ORDER: 'ORDER',
  REPORT: 'REPORT',
  TABLE: 'TABLE',
  SELL: 'SELL',
  DEBT_BOOK: 'DEBT_BOOK',
  RECEIPT_AND_EXPENSE: 'RECEIPT_AND_EXPENSE',
  // ONLINE_STORE: 'online_store',
  CUSTOMER: 'CUSTOMER',
  WAREHOUSE: 'WAREHOUSE',
  MESSAGE: 'MESSAGE',
  PRODUCT: 'PRODUCT',
} as const;

export const PRODUCT_SORT_TYPES = {
  IN_STOCK_ASC: 'in_stock_asc',
  IN_STOCK_DESC: 'in_stock_desc',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NEWEST: 'newst',
  OLDEST: 'oldest',
  CUSTOM: 'custom',
} as const;

export const PRODUCT_SETTINGS: Record<
  ProductSettingKey,
  {
    id: ProductSettingKey;
    title: string;
    description: string;
  }
> = {
  showCreateProductImage: {
    id: 'showCreateProductImage',
    title: 'Ảnh sản phẩm',
    description: 'Quản lý ảnh sản phẩm',
  },
  showCreateProductUnit: {
    id: 'showCreateProductUnit',
    title: 'Đơn vị sản phẩm',
    description: 'Quản lý đơn vị sản phẩm (lốc, lon ...)',
  },
  showCreateProductDescription: {
    id: 'showCreateProductDescription',
    title: 'Mô tả sản phẩm',
    description: 'Quản lý mô tả sản phẩm',
  },
  showCreateProductPromotionPrice: {
    id: 'showCreateProductPromotionPrice',
    title: 'Giá khuyến mãi',
    description: 'Quản lý giá khuyến mãi',
  },
  // showCreateProductWholesalePrice: {
  //   id: 'showCreateProductWholesalePrice',
  //   title: 'Giá sỉ',
  //   description: 'Quản lý giá sỉ',
  // },
  // showCreateProductTrackingStock: {
  //   id: 'showCreateProductTrackingStock',
  //   title: 'Theo dõi tồn kho',
  //   description: 'Quản lý số lượng sản phẩm',
  // },
  showCreateProductBarcode: {
    id: 'showCreateProductBarcode',
    title: 'Mã vạch',
    description: 'Quản lý mã vạch',
  },
} as const;

export const ARR_PRODUCT_SETTINGS = Object.values(PRODUCT_SETTINGS);

export const PRODUCT_GENERAL_SETTINGS = {
  id: 'general_settings',
  title: 'Thông tin chung',
  menu: [
    PRODUCT_SETTINGS.showCreateProductImage,
    PRODUCT_SETTINGS.showCreateProductUnit,
    PRODUCT_SETTINGS.showCreateProductDescription,
  ],
};

export const PRODUCT_PRICE_SETTINGS = {
  id: 'price_settings',
  title: 'Giá sản phẩm',
  menu: [
    PRODUCT_SETTINGS.showCreateProductPromotionPrice,
    // PRODUCT_SETTINGS.showCreateProductWholesalePrice,
  ],
};

export const PRODUCT_INVENTORY_SETTINGS = {
  id: 'inventory_settings',
  title: 'Tồn kho',
  menu: [
    // PRODUCT_SETTINGS.showCreateProductTrackingStock,
    PRODUCT_SETTINGS.showCreateProductBarcode,
  ],
};

export const PRODUCT_SETTING_MENU = [
  PRODUCT_GENERAL_SETTINGS,
  PRODUCT_PRICE_SETTINGS,
  PRODUCT_INVENTORY_SETTINGS,
];

export const ORDER_SETTINGS: Record<
  OrderSettingKey,
  {
    id: OrderSettingKey;
    title: string;
    description: string;
  }
> = {
  showCreateOrderNote: {
    id: 'showCreateOrderNote',
    title: 'Ghi chú',
    description: 'Thêm ghi chú cho đơn hàng',
  },
  showCreateOrderCustomer: {
    id: 'showCreateOrderCustomer',
    title: 'Khách hàng',
    description: 'Nhập thông tin khách hàng',
  },
} as const;

export const ORDER_GENERAL_SETTINGS = {
  id: 'general_settings',
  title: 'Thông tin chung',
  menu: [ORDER_SETTINGS.showCreateOrderNote],
};

export const ORDER_CUSTOMER_SETTINGS = {
  id: 'customer_settings',
  title: 'Khách hàng',
  menu: [ORDER_SETTINGS.showCreateOrderCustomer],
};

export const ORDER_SETTING_MENU = [ORDER_GENERAL_SETTINGS, ORDER_CUSTOMER_SETTINGS];

export const ARR_ORDER_SETTINGS = [
  ORDER_SETTINGS.showCreateOrderNote,
  ORDER_SETTINGS.showCreateOrderCustomer,
] as const;

export const SIZES = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
} as const;
