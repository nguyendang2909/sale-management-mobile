import { API_TAGS } from 'src/constants';

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${API_TAGS.AUTH}${API_TAGS.SIGN_IN}`,
    LOGOUT: '/auth/logout',
    TOKENS: {
      ACCESS_TOKEN: '/auth/tokens/access-token',
    },
  },
  CONVERSATIONS: {
    INDEX: '/conversations',
  },
  SHOPS: {
    INDEX: '/shops',
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
  },
  PRODUCTS: {
    INDEX: API_TAGS.PRODUCTS,
  },
  CATEGORIES: {
    INDEX: API_TAGS.CATEGORIES,
  },
  ORDERS: {
    INDEX: API_TAGS.ORDERS,
  },
};
