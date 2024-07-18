import {
  AUTH_GRANT_TYPES,
  BUSINESSES_TYPES_MAP,
  CASH_ITEM_SOURCES,
  CASH_ITEM_TYPES,
  DEVICE_PLATFORMS,
  DISCOUNT_TYPES_MAP,
  INVOICE_SETTING_FONT_SIZES,
  ORDER_PAYMENT_METHODS,
  ORDER_STATUSES,
  PRODUCT_ATTRIBUTE_TYPES_MAP,
  PRODUCT_SPECIFICATION_TYPES,
  ROLES,
  SHOP_AMENITIES_MAP,
  USER_STATUSES,
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

export type BusinessType = ValueOf<typeof BUSINESSES_TYPES_MAP>;

export type OrderStatus = ValueOf<typeof ORDER_STATUSES>;

export type AuthGrantType = ValueOf<typeof AUTH_GRANT_TYPES>;

export type OrderPaymentMethod = ValueOf<typeof ORDER_PAYMENT_METHODS>;

export type OrderItemSpecification = {
  attribute: {
    id: string;
    title: string | null;
    type: string | null;
  };
  id: string;
  title: string | null;
  type: string | null;
};

export type CashItemSource = ValueOf<typeof CASH_ITEM_SOURCES>;

export type InvoiceSettingFontSize = ValueOf<typeof INVOICE_SETTING_FONT_SIZES>;

export type ProductAttributeType = ValueOf<typeof PRODUCT_ATTRIBUTE_TYPES_MAP>;

export type ProductSpecificationType = ValueOf<typeof PRODUCT_SPECIFICATION_TYPES>;

export type CashItemType = ValueOf<typeof CASH_ITEM_TYPES>;

export type ShopAmenity = ValueOf<typeof SHOP_AMENITIES_MAP>;

export type DiscountType = ValueOf<typeof DISCOUNT_TYPES_MAP>;
