import { Image } from 'react-native-image-crop-picker';

import { OrderStatus, PaymentMethod, PaymentType } from './data.type';
import { Entity } from './entities.type';
import { ApiRequest } from './fe.type';

export declare namespace FormParams {
  type LoginByEmail = ApiRequest.LoginByEmail;

  type LoginByPhoneNumber = {
    phoneNumber: string;
    token: string;
  };

  type UpdateCategory = {
    title: string;
  };

  type SignInWithPhoneNumber = {
    phoneCode: string;
    phoneNumber: string;
  };

  type CreateProfile = {
    email: string | null;
    shopTitle: string | null;
  };

  type CreateOrderPaymentDto = {
    amount: number;
    method?: PaymentMethod;
  };

  type CreateOrder = {
    status: OrderStatus;
    address: string | null;
    deliveryMethod: string | null;
    // items: ProductWithQuantity[];
    customerId: string | null;
    note: string | null;
  };

  type UpdateOrder = {
    status: OrderStatus | null;
    address: string | null;
    deliveryMethod: string | null;
    // items: ProductWithQuantity[];
    customerId: string | null;
    note: string | null;
  };

  type UpdateOrderPayment = {
    amount: number | null;
    paymentMethod: PaymentMethod;
  };

  type CreateCategory = {
    title: string;
  };

  type CreateCustomer = {
    fullName: string;
    phoneCode: string;
    phoneNumber: string;
  };

  type UpdateProfilePhoto = {
    photos: Image[];
  };

  type UpdateProfile = {
    birthday?: string;
  };

  type SendMessage = {
    // relationshipId: string;
    text: string;
    // uuid: string;
    // replyMessageId?: string;
  };

  type DateRange = {
    startDate: string;
    endDate: string;
  };

  type CreateShop = {
    title: string | null;
    phoneNumber: string | null;
    phoneCode: string | null;
    address: string | null;
    description: string | null;
    openTime: string | null;
    closeTime: string | null;
  };

  type UpdateShop = {
    title: string;
    phone: string | null;
    address: string | null;
    description: string | null;
    openTime: string;
    closeTime: string;
  };

  type CreatePayment = {
    amount: number;
    title: string | null;
    method: PaymentMethod | null;
    note: string | null;
    imageIds: string[];
    at: string | null;
    type: PaymentType;
  };

  type CreateProductOption = {
    id: string | null;
    title: string;
    values: string[];
  };

  type CreateProductClassification = {
    options: CreateProductOption[];
  };

  type CreateProductVariant = {
    id: string | null;
    code: string | null;
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    stock: number | null;
    isInStock: boolean | null;
    isEnabled: boolean;
    option1?: string | null;
    option2?: string | null;
  };

  type CreateProduct = {
    title: string;
    description: string | null;
    label: string | null;
    unit: string | null;
    minWholesalePriceQuantity: number | null;
    categoryIds: string[];
    images: Entity.ProductImage[];
    options: CreateProductOption[];
    variants: CreateProductVariant[];
  };

  type EditSku = {
    id: string | null;
    code: string | null;
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    stock: number | null;
    isInStock: boolean | null;
  };
}
