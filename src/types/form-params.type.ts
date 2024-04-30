import { Image } from 'react-native-image-crop-picker';

import { OrderStatus, PaymentMethod } from './data.type';
import { Entity } from './entities.type';
import { ApiRequest } from './fe.type';

export declare namespace FormParams {
  type LoginByEmail = ApiRequest.LoginByEmail;

  type LoginByPhoneNumber = {
    phoneNumber: string;
    token: string;
  };

  type SignInWithPhoneNumber = {
    phoneCode: string;
    phoneNumber: string;
  };

  type CreateProduct = {
    createMore: boolean;
    title: string;
    minWholesalePriceQuantity: number | null;
    isInStock: boolean | null;
    description: string | null;
    label: string | null;
    unit: string | null;
    categories: Entity.Category[];
    images: Entity.ProductImage[];
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
      price: number | null;
      capitalPrice: number | null;
      promotionalPrice: number | null;
      wholesalePrice: number | null;
      stock: number | null;
      specificationIds: string[];
    }[];
  };

  type UpdateProduct = {
    title: string;
    minWholesalePriceQuantity: number | null;
    isInStock: boolean | null;
    description: string | null;
    label: string | null;
    unit: string | null;
    categories: Entity.Category[];
    images: Entity.ProductImage[];
    attributes: Entity.Attribute[];
    skus: Array<Partial<Entity.Sku>>;
  };

  type CreateOrder = {
    status: OrderStatus;
    paymentMethod: PaymentMethod | null;
    address: string | null;
    deliveryMethod: string | null;
    // items: ProductWithQuantity[];
    customerId: string | null;
    note: string | null;
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
}
