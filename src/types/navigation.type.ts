import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Entity } from './entities.type';

export type HomeTabParamList = {
  MANAGEMENT: undefined;
  ORDER: undefined;
  REPORT: undefined;
  TABLE: undefined;
  SELL: undefined;
  PAY_BOOK: undefined;
  RECEIPT_AND_EXPENSE: undefined;
  // ONLINE_STORE: undefined,
  CUSTOMER: undefined;
  WAREHOUSE: undefined;
  MESSAGE: undefined;
  PRODUCT: undefined;
};

export type AppStackParamList = {
  ChatProfile: {
    profile: Entity.Profile;
  };
  EditInfoHeight: undefined;
  EDIT_INFO_LOCATION: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  DATING_NEARBY_FILTER: undefined;
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;
  LikedMeProfile: {
    like: Entity.View;
  };
  Main: undefined;
  Messages: {
    matchId: string;
    match: Entity.Match;
  };
  ProfileEdit: undefined;
  ProfileNearby: {
    profile: Entity.Profile;
  };
  ProfileSetting: undefined;
  SelectRelationshipGoal: undefined;
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
  DATING_SWIPE_PROFILE: {
    profile: Entity.Profile;
  };
  SUBJECTS: undefined;
  SUBJECT: {
    subject: string;
  };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;
