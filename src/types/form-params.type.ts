import { Image } from 'react-native-image-crop-picker';

import { ProductWithQuantity } from './common.type';
import { Gender, OrderStatus, PaymentMethod, RelationshipGoal } from './data.type';
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
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    minWholesalePriceQuantity: number | null;
    sku: string;
    barcode: string;
    isTrackingStock: boolean;
    isInStock: boolean;
    inventory: number | null;
    description: string;
    label: string;
    unit: string;
    categories: Entity.Category[];
    images: Entity.ProductImage[];
  };

  type UpdateProduct = {
    title: string;
    price: number | null;
    capitalPrice: number | null;
    promotionalPrice: number | null;
    wholesalePrice: number | null;
    minWholesalePriceQuantity: number | null;
    sku: string;
    barcode: string;
    isTrackingStock: boolean;
    isInStock: boolean;
    inventory: number | null;
    description: string;
    label: string;
    unit: string;
    categories: Entity.Category[];
    images: Entity.ProductImage[];
  };

  type CreateOrder = {
    status: OrderStatus;
    paymentMethod: PaymentMethod | null;
    deliveryMethod: string | null;
    items: ProductWithQuantity[];
    customerId: string | null;
    note: string;
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
    company?: string;
    // drinking?: EDrinking;
    // educationLevel?: EEducationLevel;
    gender?: Gender;
    jobTitle?: string;
    introduce?: string;
    nickname?: string;
    latitude?: number;
    longitude?: number;
    photos?: string[];
    school?: string;
    relationshipGoal: RelationshipGoal;
    // smoking?: ESmoking;
    // workout?: EWorkout;
  };

  type UpdateProfileFilter = {
    gender?: Gender;
    maxDistance: number;
    maxAge: number;
    minAge: number;
    relationshipGoal?: RelationshipGoal;
  };

  type SendMessage = {
    // relationshipId: string;
    text: string;
    // uuid: string;
    // replyMessageId?: string;
  };
}
