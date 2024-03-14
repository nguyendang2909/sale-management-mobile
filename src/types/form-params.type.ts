import { Image } from 'react-native-image-crop-picker';

import { Gender, RelationshipGoal, StockTrackingMethod } from './data.type';
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
    title: string;
    imageIds?: string[];
    price?: number;
    capitalPrice?: number;
    promotionalPrice?: number;
    wholesalePrice?: number;
    minWholesalePriceQuantity?: number;
    sku?: string;
    barcode?: string;
    isTrackingStock?: StockTrackingMethod;
    isInStock?: boolean;
    stock?: number;
    description?: string;
    label?: string;
    unit?: string;
    createMore: boolean;
    categoryIds: string[];
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
