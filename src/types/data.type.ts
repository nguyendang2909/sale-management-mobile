import {
  AUTH_GRANT_TYPES,
  BUSINESSES,
  CASH_ITEM_SOURCES,
  DEVICE_PLATFORMS,
  INVOICE_SETTING_FONT_SIZES,
  ORDER_PAYMENT_METHODS,
  ORDER_STATUSES,
  ROLES,
  USER_STATUSES,
  WORKING_TIME_TYPES,
} from '../constants';
import { ValueOf } from '.';

export type RoleType = typeof ROLES;

export type Role = ValueOf<RoleType>;

export type UserStatusType = typeof USER_STATUSES;

export type UserStatus = ValueOf<UserStatusType>;

export type SignInData = {
  accessToken: string;
  refreshToken: string;
};

export type TokenSignPayload = {
  id: string;
  sub: string;
};

export type SignInTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AccessTokenSignPayload = TokenSignPayload & {
  role: Role;
};

export type RefreshTokenSignPayload = TokenSignPayload;

export type Client = AccessTokenSignPayload & {
  exp: number;
  iat: number;
};

export type DevicePlatform = ValueOf<typeof DEVICE_PLATFORMS>;

export type Business = ValueOf<typeof BUSINESSES>;

export type WorkingTimeType = ValueOf<typeof WORKING_TIME_TYPES>;

export type OrderStatus = ValueOf<typeof ORDER_STATUSES>;

export type AuthGrantType = ValueOf<typeof AUTH_GRANT_TYPES>;

export type OrderPaymentMethod = ValueOf<typeof ORDER_PAYMENT_METHODS>;

export type OrderPrice = {
  amount: number;
  price: number;
  promotionalPrice: number;
};

export type OrderItemSpecification = {
  attribute: {
    id: string;
    title: string;
  };
  id: string;
  title: string;
};

export type CashItemSource = ValueOf<typeof CASH_ITEM_SOURCES>;

export type InvoiceSettingFontSize = ValueOf<typeof INVOICE_SETTING_FONT_SIZES>;
