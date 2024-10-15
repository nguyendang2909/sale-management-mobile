import {
  AUTH_GRANT_TYPES_MAP,
  BUSINESSES_TYPES_MAP,
  DEVICE_PLATFORMS_MAP,
  DISCOUNT_TYPES_MAP,
  INVOICE_SETTING_FONT_SIZES_MAP,
  ORDER_STATUSES_MAP,
  PAYMENT_METHODS_MAP,
  PAYMENT_TYPES_MAP,
  PRODUCT_OPTION_TYPES_MAP,
  ROLES_MAP,
  SHOP_AMENITIES_MAP,
  USER_STATUSES_MAP,
} from '../constants';
import { ValueOf } from '.';

export type RoleType = typeof ROLES_MAP;

export type Role = ValueOf<RoleType>;

export type UserStatusType = typeof USER_STATUSES_MAP;

export type UserStatus = ValueOf<UserStatusType>;

export type SignInData = {
  accessToken: string;
  refreshToken: string;
};

export type TokenSignPayload = {
  organizationId: string;
  sub: string;
  userId: string;
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

export type DevicePlatform = ValueOf<typeof DEVICE_PLATFORMS_MAP>;

export type BusinessType = ValueOf<typeof BUSINESSES_TYPES_MAP>;

export type OrderStatus = ValueOf<typeof ORDER_STATUSES_MAP>;

export type AuthGrantType = ValueOf<typeof AUTH_GRANT_TYPES_MAP>;

export type PaymentMethod = ValueOf<typeof PAYMENT_METHODS_MAP>;

export type InvoiceSettingFontSize = ValueOf<typeof INVOICE_SETTING_FONT_SIZES_MAP>;

export type ProductOptionType = ValueOf<typeof PRODUCT_OPTION_TYPES_MAP>;

export type PaymentType = ValueOf<typeof PAYMENT_TYPES_MAP>;

export type ShopAmenity = ValueOf<typeof SHOP_AMENITIES_MAP>;

export type DiscountType = ValueOf<typeof DISCOUNT_TYPES_MAP>;

export type Phone = {
  phoneCode: string;
  phoneNumber: string;
};
