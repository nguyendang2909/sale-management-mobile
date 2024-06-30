export const ROLES = {
  ADMIN: 'admin',
  SHOP: 'shop',
  STAFF: 'staff',
} as const;

export const USER_STATUSES = {
  ACTIVATED: 'activated',
  DEACTIVATED: 'deactivated',
  BANNED: 'banned',
} as const;

export const DEVICE_PLATFORMS = {
  OTHER: 'other',
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android',
} as const;

export const ID_PATH = '/:';
export const ID = 'id';
export const SHOP_ID = 'shop_id';
export const ORDER_ID = 'order_id';
export const CATEGORY_ID = 'category_id';
export const PRODUCT_ID = 'product_id';

export const API_TAGS = {
  ID: ID_PATH + ID,
  SHOP_ID: ID_PATH + SHOP_ID,
  ORDER_ID: ID_PATH + ORDER_ID,
  CATEGORY_ID: ID_PATH + CATEGORY_ID,
  PRODUCT_ID: ID_PATH + PRODUCT_ID,

  AUTH: '/auth',
  USERS: '/users',
  ME: '/me',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  SHOPS: '/shops',
  ORDERS: '/orders',
  HEALTH: '/health',
  BULK: '/bulk',
  AVATAR: '/avatar',
  SETTINGS: '/settings',
  SIGN_IN: '/sign-in',
  REFRESH_TOKENS: '/refresh-tokens',
  LOGOUT: '/logout',
  ALL: '/all',
  CUSTOMERS: '/customers',
  IMAGES: '/images',
  DEBTS: '/debts',
  ADD: '/add',
  DINING_TABLES: '/dining-tables',
  DINING_TABLE_GROUPS: '/dining-table-groups',
  DINING_TABLE_PRODUCTS: '/dining-table-products',
  REPORTS: '/reports',
  REVENUE: '/revenue',
  UNCOMPLETED: '/uncompleted',
  COUNT: '/count',
  CARDS: '/cards',
  WEBHOOKS: '/webhooks',
  SCRIPTS: '/scripts',
  BANKS: '/banks',
  PAYMENTS: '/payments',
  QR_CODE: '/qr-code',
  STATISTICS: '/statistics',
  SKUS: '/skus',
  ITEMS: '/items',
  NOTIFICATIONS: '/notifications',
  CASH_ITEMS: '/cash-items',
  INVOICES: '/invoices',
  PACKAGES: '/packages',
  PACKAGES_GROUPS: '/package-groups',
  SALE: '/sale',
  OVERALL: '/overall',
  CANCEL: '/cancel',
} as const;

export const BUSINESS_CATEGORIES = {
  SALE: 'sale',
  SERVICE: 'service',
};

export const BUSINESS_SALES = {
  FOOD_AND_DRINK: 'food_and_drink',
  GROCERY_AND_MINI_SUPERMARKET: 'grocery_and_mini_supermarket',
  AGRICULTURAL_PRODUCT_AND_FOOD: 'agricultural_product_and_food',
  COSMETIC: 'cosmetic',
  FASHION: 'fashion',
  FURNITURE_AND_HOUSEWARE: 'furniture_and_houseware',
  PHONE_AND_ELECTRONIC: 'phone_and_electronic',
  PHARMACY_AND_HEALTH: 'pharmacy_and_health',
  MOTHER_AND_BABY: 'mother_and_baby',
  PET_AND_ACCESSORY: 'pet_and_accessory',
  FLOWER_AND_GIFT: 'flower_and_gift',
  BOOK_AND_STATIONERY: 'book_and_stationery',
  OTHER_SALE: 'other_sale',
} as const;

export const BUSINESS_SERVICES = {
  HAIR_AND_SALON: 'hair_and_salon',
  NAIL: 'nail',
  SPA_AND_MASSAGE: 'spa_and_massage',
  LAUNDRY: 'laundry',
  CAR_REPAIR_AND_CAR_WASH: 'car_repair_and_car_wash',
  KARAOKE: 'karaoke',
  OTHER_SERVICE: 'other_service',
} as const;

export const BUSINESSES = {
  ...BUSINESS_SALES,
  ...BUSINESS_SERVICES,
} as const;

export const BUSINESS_LEVELS = [
  {
    category: BUSINESS_CATEGORIES.SALE,
    types: Object.values(BUSINESS_SALES),
  },
  {
    category: BUSINESS_CATEGORIES.SERVICE,
    types: Object.values(BUSINESS_SERVICES),
  },
] as const;

export const ORDER_STATUSES = {
  UNCONFIRMED: 'unconfirmed',
  PROCESSING: 'processing',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
} as const;

export const AUTH_GRANT_TYPES = {
  PHONE_PASSWORD: 'phone_password',
  PHONE_TOKEN: 'phone_token',
  APPLE: 'apple',
  GOOGLE: 'google',
} as const;

export const ORDER_PAYMENT_METHODS = {
  CASH: 'cash',
  DIGITAL_WALLET: 'digital_wallet',
  BANK: 'bank',
  QR_CODE: 'qr_code',
} as const;

export const CASH_ITEM_SOURCES = {
  CASH: 'cash',
  DIGITAL_WALLET: 'digital_wallet',
  BANK: 'bank',
} as const;

export const INVOICE_SETTING_FONT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const PRODUCT_ATTRIBUTE_TYPES = {
  COLOR: 'color',
  SIZE: 'size',
  MATERIAL: 'material',
  TASTE: 'taste',
  ORIGIN: 'origin',
} as const;

export const PRODUCT_COLOR_TYPES = {
  RED: 'red',
  BLACK: 'black',
  WHITE: 'white',
} as const;

export const PRODUCT_SIZE_TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const PRODUCT_SPECIFICATION_TYPES = {
  ...PRODUCT_COLOR_TYPES,
  ...PRODUCT_SIZE_TYPES,
} as const;

export const CASH_ITEM_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;
