import { Image } from 'react-native-image-crop-picker';

import { OrderStatus, PaymentMethod, PaymentType, ProductAttributeType } from './data.type';
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

  type UpdateProduct = {
    title: string;
    minWholesalePriceQuantity: number | null;
    description: string | null;
    label: string | null;
    unit: string | null;
    categoryIds: string[];
    images: Entity.ProductImage[];
    attributes: Entity.Attribute[];
    skus: Array<Partial<Entity.Sku>>;
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

  type CreateProductSpecification = {
    id: string;
    title: string;
    // type: ProductSpecificationType | null;
    imageId: string | null;
  };

  type CreateProductAttribute = {
    title: string;
    type: ProductAttributeType | null;
    specifications: CreateProductSpecification[];
  };

  type CreateProductClassification = {
    attributes: CreateProductAttribute[];
  };

  type CreateProductSku = {
    code: string | null;
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    stock: number | null;
    specificationIds: string[];
    isInStock: boolean | null;
  };

  type CreateProduct = {
    title: string;
    description: string | null;
    label: string | null;
    unit: string | null;
    minWholesalePriceQuantity: number | null;
    categoryIds: string[];
    images: Entity.ProductImage[];
    attributes: CreateProductAttribute[];
    skus: CreateProductSku[];
  };

  type EditSku = {
    code: string | null;
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    stock: number | null;
    isInStock: boolean | null;
  };
}
