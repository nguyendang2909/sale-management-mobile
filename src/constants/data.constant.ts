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

// TODO: Remove
export const GENDERS = {
  MALE: 1,
  FEMALE: 2,
} as const;

// TODO: Remove
export const ARR_GENDERS = Object.values(GENDERS);

// TODO: Remove
export const RELATIONSHIP_GOALS = {
  BOY_GIRL_FRIEND: 1,
  MAKE_FRIENDS: 2,
  SEX_PARTNER: 3,
  GET_MARRIED: 4,
  ONE_NIGHT_STAND: 5,
} as const;
// TODO: Remove
export const ARR_RELATIONSHIP_GOALS = Object.values(RELATIONSHIP_GOALS);
// TODO: Remove
export const RELATIONSHIP_STATUSES = {
  SINGLE: 1,
  HAVE_BOY_GIRL_FRIEND: 2,
  MARRIED: 3,
  DIVORCED_WITHOUT_CHILDREN: 4,
  DIVORCED_WITH_CHILDREN: 5,
  SINGLE_MOM_DAD: 6,
} as const;
// TODO: Remove
export const EDUCATION_LEVELS = {
  HIGH_SCHOOL: 1,
  BACHELOR: 2,
  ASSOCIATE: 3,
  UNDERGRADUATE: 4,
  MASTER: 5,
  DOCTOR: 6,
  PROFESSOR: 7,
} as const;
// TODO: Remove
export const MEDIA_FILE_TYPES = {
  photo: 1,
  video: 2,
} as const;
// TODO: Remove
export const WEEKLY_COINS = [10, 20, 40, 70, 110, 160, 220];
// TODO: Remove
export const WEEKLY_COINS_LENGTH = WEEKLY_COINS.length;

export const DEVICE_PLATFORMS = {
  OTHER: 'other',
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android',
} as const;

// TODO: Remove
export const SOCKET_TO_SERVER_EVENTS = {
  SEND_MESSAGE: 'sendMsg',
  EDIT_MESSAGE: 'editMsg',
  READ_MESSAGE: 'readMsg',
} as const;

// TODO: Remove
export const SOCKET_TO_CLIENT_EVENTS = {
  UNMATCH: 'unmatch',
  ERROR: 'error',
  NEW_MESSAGE: 'msg',
  UPDATE_SENT_MESSAGE: 'update_sent_message',
  MATCH: 'match',
  EDIT_SENT_MESSAGE: 'edit_sent_message',
} as const;

// TODO: Remove
export const MEMBERSHIPS = {
  FREE: 1,
  GOLD: 2,
  PLATINUM: 3,
};

export const WORKING_TIME_TYPES = {
  ALWAYS_OPEN: 'always_open',
  STANDARD_TIME: 'standard_time',
} as const;

export const STOCK_TRACKING_METHODS = {
  NONE: 'none',
  TRACKING_STOCK: 'tracking_stock',
};

export const API_TAGS = {
  AUTH: '/auth',
  USERS: '/users',
  ME: '/me',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  SHOPS: '/shops',
  ORDERS: '/orders',
  HEALTH: '/health',
  BULK: '/bulk',
  IMAGE: '/image',
  AVATAR: '/avatar',
};

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
  WAIT_TO_CONFIRM: 'wait_to_confirm',
  PROCESSING: 'processing',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  CANCEL: 'cancel',
} as const;
