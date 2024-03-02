import {
  BUSINESSES,
  DEVICE_PLATFORMS,
  EDUCATION_LEVELS,
  GENDERS,
  MEDIA_FILE_TYPES,
  MEMBERSHIPS,
  ORDER_STATUSES,
  RELATIONSHIP_GOALS,
  RELATIONSHIP_STATUSES,
  ROLES,
  STOCK_TRACKING_METHODS,
  USER_STATUSES,
  WORKING_TIME_TYPES,
} from '../constants/data.constant';
import { ValueOf } from './common.type';

export type Pagination = {
  _next?: null | string;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
  type: string;
};

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];

export type RelationshipGoal = (typeof RELATIONSHIP_GOALS)[keyof typeof RELATIONSHIP_GOALS];

export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[keyof typeof RELATIONSHIP_STATUSES];

export type EducationLevel = (typeof EDUCATION_LEVELS)[keyof typeof EDUCATION_LEVELS];

export type MediaFileType = (typeof MEDIA_FILE_TYPES)[keyof typeof MEDIA_FILE_TYPES];

export type DevicePlatform = (typeof DEVICE_PLATFORMS)[keyof typeof DEVICE_PLATFORMS];

export type Membership = (typeof MEMBERSHIPS)[keyof typeof MEMBERSHIPS];

export type WorkingTimeType = ValueOf<typeof WORKING_TIME_TYPES>;

export type RoleType = typeof ROLES;

export type Role = ValueOf<RoleType>;

export type UserStatusType = typeof USER_STATUSES;

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

export type Client = AccessTokenSignPayload & {
  exp: number;
  iat: number;
};

export type StockTrackingMethod = ValueOf<typeof STOCK_TRACKING_METHODS>;

export type Business = ValueOf<typeof BUSINESSES>;

export type OrderStatus = ValueOf<typeof ORDER_STATUSES>;
