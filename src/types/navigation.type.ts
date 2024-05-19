import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStore } from './app-store.type';
import { Entity } from './entities.type';
import { FormParams } from './form-params.type';

export type HomeTabParamList = {
  MANAGEMENT: undefined;
  ORDERS: undefined;
  REPORTS: undefined;
  TABLES: undefined;
  SELL: undefined;
  DEBT_BOOK: undefined;
  RECEIPT_AND_EXPENSE: undefined;
  // ONLINE_STORE: undefined,
  CUSTOMERS: undefined;
  WAREHOUSE: undefined;
  MESSAGES: undefined;
  PRODUCTS: undefined;
};

export type AppStackParamList = {
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  HOME: NavigatorScreenParams<HomeTabParamList>;
  Main: undefined;
  // Messages: {
  //   matchId: string;
  //   match: Entity.Match;
  // };
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
  // Product
  PRODUCT_CREATE: undefined;
  PRODUCT: {
    detail: AppStore.Product;
  };
  PRODUCT_SETTING: undefined;
  // Order
  ORDER_CREATE: {
    values: FormParams.CreateOrder;
  };
  ORDER_CONFIRM: {
    values: FormParams.CreateOrder;
  };
  ORDER_SETTING: undefined;
  ORDER: {
    detail: Entity.Order;
  };
  ORDER_PAYMENT: {
    order: Entity.Order;
  };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;
