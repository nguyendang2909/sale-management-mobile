import { Image } from 'react-native-image-crop-picker';

import { DevicePlatform, Gender, RelationshipGoal, StockTrackingMethod } from './data.type';
import { Entity } from './entities.type';

export declare namespace ApiRequest {
  type FindAll = {
    fields?: string[];
  };

  type Pagination = {
    _next?: string;
    // _prev?: string;
  };

  type FindMany<T> = Pagination & T;

  type IsExistUser = {
    phoneNumber: string;
  };

  type SignInWithPhoneNumber = {
    token: string;
  };

  type SignInWithGoogle = {
    token: string;
  };

  type SignInWithFacebook = {
    token: string;
  };

  type SignInWithApple = {
    token: string;
  };

  type LoginByEmail = {
    email: string;
    password: string;
  };

  type LoginByGoogle = {
    token: string;
  };

  type LoginByFacebook = {
    token: string;
  };

  type LoginByPhoneNumber = {
    token: string;
  };

  type Logout = {
    refreshToken: string;
  };

  type RefreshAccessToken = {
    refreshToken: string;
  };

  type UpdateProfileFilter = {
    gender?: Gender;
    maxDistance?: number;
    minAge?: number;
    maxAge?: number;
    relationshipGoal?: RelationshipGoal;
  };

  type CreateMe = {
    email?: string;
    shopTitle?: string;
  };

  type SearchUsersNearby = Pagination;

  type UploadPhoto = {
    file: Image;
  };

  type FindManyConversations = Pagination;

  type FindManyMessages = FindMany<{ matchId: string }>;

  type FindManySwipeProfiles = FindMany<object>;

  type FindManyMatches = Pagination;

  type FindManyNearbyProfiles = Pagination & {
    longitude?: number;
    latitude?: number;
  };

  type FindManyNextSwipeProfiles = Pagination;

  type CreateProduct = {
    title: string;
    imageIds?: string[];
    price: number;
    capitalPrice: number;
    promotionalPrice?: number;
    wholesalePrice?: number;
    minWholesalePriceQuantity?: number;
    sku?: string;
    barcode?: string;
    stockTrackingMethod?: StockTrackingMethod;
    isInStock?: boolean;
    stock?: number;
    description?: string;
    label?: string;
  };

  type UpdateProduct = {};

  type CreateCategory = {
    title: string;
  };

  type UpdateCategory = Partial<CreateCategory>;

  type SendView = {
    targetUserId: string;
  };

  type FindAllProducts = {
    search?: string;
    categoryId?: string;
  };

  type FindManyProducts = FindAllProducts & Pagination;

  type FindManyCategories = Pagination;

  type FindManyShops = Pagination;

  type CreateMatch = {
    targetUserId: string;
  };

  type UpdateSignedDevice = {
    refreshToken: string;
    deviceToken: string;
    devicePlatform: DevicePlatform;
  };
}

export declare namespace ApiResponse {
  type Pagination = {
    _next: string | null;
    _prev?: string | null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & {
    data: T;
    type?: string;
  };

  type PaginatedResponse<T> = {
    data: T[];
    pagination: Pagination;
    type: string;
  };

  type Product = FetchData<Entity.Match>;

  type Products = PaginatedResponse<Entity.Product>;

  type Category = FetchData<Entity.Category>;

  type Categories = PaginatedResponse<Entity.Category>;

  type Shops = PaginatedResponse<Entity.Shop>;

  type Shop = FetchData<Entity.Shop>;

  type SuccessResponse = FetchData<{ success: boolean }>;

  type RefreshAccessToken = FetchData<{ accessToken: string }>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FetchPaginationData<T, R extends Record<string, any> = object> = {
    [P in keyof R]?: R[P];
  } & FetchData<T, { pagination: Pagination }>;

  type Tokens = {
    accessToken?: string;
    refreshToken?: string;
  };

  type RemoveData = FetchData<{ success: true }>;

  type UploadedFileListData = FetchData<Entity.MediaFile[]>;

  type User = FetchData<Entity.User>;

  type Profile = FetchData<Entity.Profile>;

  type ProfileFilterData = FetchData<Entity.ProfileFilter>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Entity.Message> & {
    _matchId: string;
  };
}
