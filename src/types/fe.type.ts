import { Image } from 'react-native-image-crop-picker';

import { AuthGrantType, DevicePlatform } from './data.type';
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

  type SignIn = {
    grantType: AuthGrantType;
    token?: string;
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
    capitalPrice?: number;
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
    unit?: string;
  };

  type UpdateProduct = {};

  type CreateCustomer = {
    fullName: string;
    phoneCode?: string;
    phoneNumber?: string;
  };

  type UpdateCustomer = Partial<CreateCustomer>;

  type CreateCategory = {
    title: string;
  };

  type UpdateCategory = Partial<CreateCategory>;

  type FindAllCustomers = {
    searchText?: string;
  };

  type CreateOrderItem = {};

  type CreateOrder = {
    status: OrderStatus;
    paymentMethod?: string;
    deliveryMethod?: string;
    items: { productId: string }[];
  };

  type SendView = {
    targetUserId: string;
  };

  type FindAllProducts = {
    searchText?: string;
    categoryId?: string;
  };

  type FindManyProducts = FindAllProducts & Pagination;

  type FindAllCategories = {
    title?: string;
  };

  type FindManyCategories = Pagination & FindAllCategories;

  type FindManyShops = Pagination;

  type FindAllOrders = {};

  type FindManyOrders = FindAllOrders & Pagination;

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

  type Customer = FetchData<Entity.Customer>;

  type Customers = PaginatedResponse<Entity.Customer>;

  type Order = FetchData<Entity.Order>;

  type Orders = PaginatedResponse<Entity.Order>;

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

  type Setting = FetchData<Entity.Setting>;

  type ProductImage = FetchData<Entity.ProductImage>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Entity.Message> & {
    _matchId: string;
  };
}
