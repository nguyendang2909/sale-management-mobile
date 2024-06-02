import { Image } from 'react-native-image-crop-picker';
import { ORDER_SETTINGS, PRODUCT_SETTINGS } from 'src/constants/constants';

import { AppStore } from './app-store.type';
import { ValueOf } from './common.type';
import { AuthGrantType, DevicePlatform, OrderPaymentMethod, OrderStatus } from './data.type';
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
    email?: string | null;
    shopTitle?: string | null;
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
    minWholesalePriceQuantity: number | null;
    isInStock: boolean | null;
    description: string | null;
    label: string | null;
    unit: string | null;
    categoryIds?: string[];
    imageIds?: string[];
    attributes: {
      title: string;
      specifications: {
        title: string;
        id: string;
      }[];
    }[];
    skus: {
      imageId: string | null;
      code: string | null;
      price: number;
      capitalPrice: number | null;
      promotionalPrice: number | null;
      wholesalePrice: number | null;
      stock: number | null;
      specificationIds: string[];
    }[];
  };

  type UpdateProduct = Partial<CreateProduct>;

  type CreateCustomer = {
    fullName: string;
    phoneCode?: string;
    phoneNumber?: string;
  };

  type UpdateCustomer = Partial<CreateCustomer>;

  type CreateCategory = {
    title: string;
  };

  type UpdateCategory = {
    title?: string;
    productIds?: string[];
    deleteProductIds?: string[];
    addProductIds?: string[];
  };

  type FindAllCustomers = {
    searchText?: string;
  };

  type CreateOrderItem = { skuId: string; quantity: number };

  type CreateOrder = {
    status: OrderStatus;
    deliveryMethod?: string;
    items: CreateOrderItem[];
    customerId?: string;
  };

  type AddPayment = {
    amount: number;
    method?: OrderPaymentMethod;
    at?: string;
  };

  type UpdateOrderItem = {
    id?: string;
    skuId?: string;
    quantity: string;
  };

  type UpdateOrder = {
    status?: OrderStatus;
    paymentMethod?: OrderPaymentMethod;
    deliveryMethod?: string;
    items?: UpdateOrderItem[];
    addPayment?: AddPayment;
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

  type FindAllOrders = {
    _next?: string;
    searchText?: string;
    status?: OrderStatus;
    startDate?: string;
    endDate?: string;
    paymentMethod?: OrderPaymentMethod;
  };

  type FindManyOrders = FindAllOrders & Pagination;

  type CreateMatch = {
    targetUserId: string;
  };

  type UpdateSignedDevice = {
    refreshToken: string;
    deviceToken: string;
    devicePlatform: DevicePlatform;
  };

  type UpdateProductSettings = Partial<{
    showTrackingStockNotification?: boolean;
    showImage?: boolean;
    showUnit?: boolean;
    showDescription: boolean;
    showPromotionalPrice: boolean;
    showWholesalePrice: boolean;
    showTrackingStock: boolean;
    showBarcode: boolean;
  }>;

  type UpdateOrderSettings = Partial<{
    showCustomer?: boolean;
    showNote?: boolean;
  }>;
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

  type Product = FetchData<Entity.Product>;

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

  type ProductSetting = FetchData<Entity.ProductSetting>;

  type OrderSetting = FetchData<Entity.OrderSetting>;

  type InvoiceSetting = FetchData<Entity.InvoiceSetting>;

  type ProductImage = FetchData<Entity.ProductImage>;

  type Logged = FetchData<{
    accessToken: string;
    refreshToken: string;
  }>;

  type Messages = PaginatedResponse<Entity.Message> & {
    _matchId: string;
  };
}

export type ProductSettingKey = keyof Pick<
  AppStore.ProductSetting,
  | 'showBarcode'
  | 'showImage'
  | 'showDescription'
  | 'showPromotionalPrice'
  // | 'showTrackingStock'
  | 'showUnit'
  // | 'showWholesalePrice'
>;

export type OrderSettingKey = keyof Pick<AppStore.OrderSetting, 'showCustomer' | 'showNote'>;

export type ProductSetting = (typeof PRODUCT_SETTINGS)[keyof typeof PRODUCT_SETTINGS];

export type OrderSetting = ValueOf<typeof ORDER_SETTINGS>;
