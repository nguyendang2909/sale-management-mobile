import { Image } from 'react-native-image-crop-picker';
import { ORDER_SETTINGS, PRODUCT_SETTINGS } from 'src/constants/constants';

import { AppStore } from './app-store.type';
import { ValueOf } from './common.type';
import { DevicePlatform, OrderStatus, PaymentMethod } from './data.type';
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

  type DateRange = {
    startDate?: string;
    endDate?: string;
  };

  type IsExistUser = {
    phoneNumber: string;
  };

  type BaseSignIn = {
    deviceType?: DevicePlatform;
    deviceToken?: string;
  };

  type SignInByPhoneNumber = BaseSignIn & {
    token: string;
  };

  type SignInByApple = BaseSignIn & {
    token: string;
  };

  type SignInByGoogle = BaseSignIn & {
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
    description: string | null;
    label: string | null;
    unit: string | null;
    categoryIds?: string[];
    imageIds?: string[];
    options: {
      title: string;
      values: string[];
    }[];
    variants: {
      sku: string | null;
      price: number;
      capitalPrice: number | null;
      promotionalPrice: number | null;
      wholesalePrice: number | null;
      stock: number | null;
      isInStock: boolean | null;
      isEnabled: boolean;
    }[];
  };

  type UpdateProductVariant = {
    id?: string;
    code?: string | null;
    price?: number;
    capitalPrice?: number | null;
    promotionalPrice?: number | null;
    wholesalePrice?: number | null;
    stock?: number | null;
    isInStock?: boolean | null;
    isEnabled?: boolean | null;
    option1?: string | null;
    option2?: string | null;
  };

  type UpdateProduct = Partial<{
    title: string;
    minWholesalePriceQuantity: number | null;
    description: string | null;
    label: string | null;
    unit: string | null;
    categoryIds?: string[];
    imageIds?: string[];
    options: {
      id?: string;
      title: string;
      values: string[];
    }[];
    variants: UpdateProductVariant[];
  }>;

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

  type CreateOrderItem = { productId: string; variantId: string; quantity: number };

  type CreateOrder = {
    shopId: string;
    status: OrderStatus;
    deliveryMethod?: string;
    items: CreateOrderItem[];
    customerId?: string;
  };

  type AddPayment = {
    amount: number;
    method?: PaymentMethod;
    at?: string;
  };

  type UpdateOrderItem = {
    id?: string;
    variantId?: string;
    quantity: string;
  };

  type UpdateOrder = {
    status?: OrderStatus;
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
    shopId: string;
    _next?: string;
    searchText?: string;
    status?: OrderStatus | OrderStatus[];
    startDate?: string;
    endDate?: string;
    paymentMethod?: PaymentMethod;
  };

  type FindManyOrders = FindAllOrders & Pagination;

  type FindAllPayments = DateRange & {
    shopId: string;
  };

  type FindManyPayments = FindAllPayments;

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

  type FindOrderOverall = DateRange & { shopId?: string };

  type FindOrderStatistics = DateRange & { shopId?: string };

  type UpdateShop = {
    title?: string;
    phone?: string | null;
    address?: string | null;
    description?: string | null;
    openTime?: string | null;
    closeTime?: string | null;
    businessTypes?: string[] | null;
  };

  type CreatePayment = {
    shopId: string;
    amount: number;
    title?: string | null;
    method?: PaymentMethod | null;
    note?: string | null;
    imageIds?: string[];
    at?: string | null;
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

  type Payments = PaginatedResponse<Entity.PaymentGroupDate>;

  type PaymentsGroupDate = PaginatedResponse<Entity.PaymentGroupDate>;

  type Payment = FetchData<Entity.Payment>;

  type PaymentsOverall = FetchData<
    Partial<{
      startDate: string;
      endDate: string;
      incomeAmount: number;
      expenditureAmount: number;
    }>
  >;

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

  type OrderOverall = FetchData<{
    totalOrders?: number;
    revenue?: number;
  }>;

  type OrderStatistics = FetchData<
    {
      revenue?: number;
      interval?: string;
    }[]
  >;

  type Count = FetchData<{
    total?: number;
  }>;
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
