import { API_TAGS } from 'src/constants';

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${API_TAGS.AUTH}${API_TAGS.SIGN_IN}`,
    LOGOUT: `${API_TAGS.AUTH}${API_TAGS.LOGOUT}`,
    REFRESH_TOKENS: `${API_TAGS.AUTH}${API_TAGS.REFRESH_TOKENS}`,
  },
  CONVERSATIONS: {
    INDEX: '/conversations',
  },
  SHOPS: {
    INDEX: '/shops',
    ALL: '/shops/all',
    ORDERS_BY_SHOP_ID: (shopId: string) => {
      return API_TAGS.SHOPS + '/' + shopId + API_TAGS.ORDERS;
    },
    SHOP_ID: {
      get: (shopId: string) => API_TAGS.SHOPS + '/' + shopId,
      ORDERS: {
        COUNT: (shopId: string) => {
          return API_TAGS.SHOPS + '/' + shopId + API_TAGS.ORDERS + API_TAGS.COUNT;
        },
      },
      SALE: {
        OVERALL: (shopId: string) => {
          return API_TAGS.SHOPS + '/' + shopId + API_TAGS.SALE + API_TAGS.OVERALL;
        },
        STATISTICS: (shopId: string) => {
          return API_TAGS.SHOPS + '/' + shopId + API_TAGS.SALE + API_TAGS.STATISTICS;
        },
      },
    },
  },
  LIKES: {
    INDEX: '/likes',
    ME: '/likes/me',
  },
  MATCHES: {
    INDEX: '/matches',
    BY_TARGET_USER: '/matches/target-user',
    UNMATCH: '/matches/unmatch',
  },
  MEDIA_FILES: {
    INDEX: '/media-files',
  },
  MESSAGES: {
    INDEX: '/messages',
  },
  PHOTOS: {
    INDEX: '/media-files/photos',
  },
  PROFILE_FILTERS: {
    INDEX: '/profile-filters',
    ME: '/profile-filters/me',
  },
  PROFILES: {
    INDEX: '/profiles',
    ME: {
      INDEX: '/profiles/me',
      BASIC: '/profiles/me/basic',
      BASIC_PHOTO: '/profiles/me/basic-photo',
      GEOLOCATION: '/profiles/me/geolocation',
    },
    NEARBY: '/profiles/nearby',
    SWIPE: '/profiles/swipe',
  },
  SIGNED_DEVICES: {
    INDEX: '/signed-devices',
  },
  USERS: {
    INDEX: '/users',
    ME: '/users/me',
    BLOCKS: '/users/blocks',
  },
  VIEWS: {
    INDEX: '/views',
  },
  ME: {
    INDEX: API_TAGS.ME,
    SETTINGS: {
      INDEX: `${API_TAGS.ME}${API_TAGS.SETTINGS}`,
      PRODUCTS: {
        INDEX: `${API_TAGS.ME}${API_TAGS.SETTINGS}${API_TAGS.PRODUCTS}`,
      },
      INVOICES: {
        INDEX: `${API_TAGS.ME}${API_TAGS.SETTINGS}${API_TAGS.INVOICES}`,
      },
      ORDERS: {
        INDEX: `${API_TAGS.ME}${API_TAGS.SETTINGS}${API_TAGS.ORDERS}`,
      },
    },
  },
  PRODUCTS: {
    INDEX: API_TAGS.PRODUCTS,
    ALL: `${API_TAGS.PRODUCTS}${API_TAGS.ALL}`,
    IMAGES: `${API_TAGS.PRODUCTS}${API_TAGS.IMAGES}`,
  },
  CATEGORIES: {
    INDEX: API_TAGS.CATEGORIES,
    ALL: `${API_TAGS.CATEGORIES}${API_TAGS.ALL}`,
    ALL_PRODUCTS_BY_CATEGORY_ID: (categoryId: string) => {
      return API_TAGS.CATEGORIES + '/' + categoryId + API_TAGS.PRODUCTS + API_TAGS.ALL;
    },
    BY_ID: (categoryId: string) => {
      return API_TAGS.CATEGORIES + '/' + categoryId;
    },
  },
  ORDERS: {
    INDEX: API_TAGS.ORDERS,
    ID: (id: string) => API_TAGS.ORDERS + '/' + id,
  },
  CUSTOMERS: {
    INDEX: API_TAGS.CUSTOMERS,
    ALL: `${API_TAGS.CUSTOMERS}${API_TAGS.ALL}`,
  },
  CASH_ITEMS: {
    INDEX: API_TAGS.CASH_ITEMS,
  },
};
