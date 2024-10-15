export const ROLES_MAP = {
  ADMIN: 'admin',
  SHOP: 'shop',
  STAFF: 'staff',
} as const;

export const USER_STATUSES_MAP = {
  ACTIVATED: 'activated',
  DEACTIVATED: 'deactivated',
  BANNED: 'banned',
} as const;

export const DEVICE_PLATFORMS_MAP = {
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
  SKUS: '/variants',
  ITEMS: '/items',
  NOTIFICATIONS: '/notifications',
  INVOICES: '/invoices',
  PACKAGES: '/packages',
  PACKAGES_GROUPS: '/package-groups',
  SALE: '/sale',
  OVERALL: '/overall',
  CANCEL: '/cancel',
  WAREHOUSE_ORDERS: '/warehouse-orders',
  IMPORTS: '/imports',
  EXPORTS: '/exports',
  NOTES: '/notes',
  PHONE: '/phone',
  PHONE_PASSWORD: '/phone-password',
  APPLE: '/apple',
} as const;

export const BUSINESS_CATEGORIES_MAP = {
  SALE: 'sale',
  SERVICE: 'service',
};

export const BUSINESS_SALE_TYPES_MAP = {
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

export const BUSINESS_SERVICE_TYPES_MAP = {
  HAIR_AND_SALON: 'hair_and_salon',
  NAIL: 'nail',
  SPA_AND_MASSAGE: 'spa_and_massage',
  LAUNDRY: 'laundry',
  CAR_REPAIR_AND_CAR_WASH: 'car_repair_and_car_wash',
  KARAOKE: 'karaoke',
  OTHER_SERVICE: 'other_service',
} as const;

export const BUSINESSES_TYPES_MAP = {
  ...BUSINESS_SALE_TYPES_MAP,
  ...BUSINESS_SERVICE_TYPES_MAP,
} as const;

export const BUSINESS_LEVELS = [
  {
    category: BUSINESS_CATEGORIES_MAP.SALE,
    types: Object.values(BUSINESS_SALE_TYPES_MAP),
  },
  {
    category: BUSINESS_CATEGORIES_MAP.SERVICE,
    types: Object.values(BUSINESS_SERVICE_TYPES_MAP),
  },
] as const;

export const CREATE_ORDER_STATUSES_MAP = {
  UNCONFIRMED: 'unconfirmed',
  PROCESSING: 'processing',
  DELIVERED: 'delivered',
} as const;

export const ORDER_STATUSES_MAP = {
  ...CREATE_ORDER_STATUSES_MAP,
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
} as const;

export const AUTH_GRANT_TYPES_MAP = {
  PHONE_PASSWORD: 'phone_password',
  PHONE_TOKEN: 'phone_token',
  APPLE: 'apple',
} as const;

export const PAYMENT_METHODS_MAP = {
  CASH: 'cash',
  DIGITAL_WALLET: 'digital_wallet',
  BANK: 'bank',
  QR_CODE: 'qr_code',
} as const;

export const INVOICE_SETTING_FONT_SIZES_MAP = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const PRODUCT_ATTRIBUTE_TYPES_MAP = {
  COLOR: 'color',
  SIZE: 'size',
  MATERIAL: 'material',
  TASTE: 'taste',
  ORIGIN: 'origin',
} as const;

export const PRODUCT_COLOR_TYPES_MAP = {
  RED: 'red',
  BLACK: 'black',
  WHITE: 'white',
} as const;

export const PRODUCT_SIZE_TYPES_MAP = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const PRODUCT_SPECIFICATION_TYPES_MAP = {
  ...PRODUCT_COLOR_TYPES_MAP,
  ...PRODUCT_SIZE_TYPES_MAP,
} as const;

export const PAYMENT_TYPES_MAP = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export const SHOP_AMENITIES_MAP = {
  DELIVERY: 'delivery',
  CODE_PAYMENT: 'cod_payment',
  BANK_PAYMENT: 'bank_payment',
  FREE_RETURN: 'free_return',
  SUPPORT_24_7: 'support_24_7',
} as const;

export const DISCOUNT_TYPES_MAP = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
} as const;

export const DEFAULT_PRODUCT_SETTINGS = {
  showTrackingStockNotification: true,
  showImage: true,
  showUnit: false,
  showDescription: false,
  showPromotionalPrice: true,
  showWholesalePrice: false,
  showTrackingStock: true,
  showBarcode: false,
} as const;

export const DEFAULT_ORDER_INVOICE_SETTINGS = {
  fontSize: INVOICE_SETTING_FONT_SIZES_MAP.MEDIUM,
  title: null,
  phoneCode: null,
  phoneNumber: null,
  showPhoneNumber: true,
  showAddress: true,
  showQRCode: true,
  description: null,
  showShopDescription: false,
  showCustomerName: true,
  showCustomerPhone: true,
  showCustomerPoint: false,
  showCustomerAddress: false,
  showOrderCode: true,
  showOrderNote: true,
  showEmployee: false,
  showDiningTable: false,
  showTime: false,
  showPromotionalPrice: true,
  showVatRate: false,
  vatRate: null,
  showPayout: true,
  showDebt: false,
  showBankAccount: true,
  showBankQR: false,
  showShopNote: true,
  showShopLogo: true,
  showFooterNote: true,
  footerNote: null,
} as const;

export const DEFAULT_ORDER_SETTINGS = {
  showCustomer: false,
  showNote: false,
} as const;
