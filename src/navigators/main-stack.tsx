import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from 'src/constants';
import { CreateBasicProfileScreen } from 'src/screens';
import { ProfileSettingScreen } from 'src/screens/Me/ProfileSettingScreen';
import { OrderScreen } from 'src/screens/order/order.screen';
import { OrderConfirmScreen } from 'src/screens/order-confirm/order-confirm.screen';
import { OrderCreateScreen } from 'src/screens/order-create/order-create.screen';
import { OrderSettingScreen } from 'src/screens/order-setting/order-setting.screen';
import { OrderUpdatePaymentScreen } from 'src/screens/order-update-payment/order-update-payment.screen';
import { MainScreen } from 'src/screens/Pre/MainScreen';
import { CreateProductScreen } from 'src/screens/product-create/create-product';
import { ProductScreen } from 'src/screens/product-detail/product.screen';
import { ProductSettingScreen } from 'src/screens/product-setting/product-setting.screen';
import { colors } from 'src/theme';
import { AppStore, Entity, FormParams } from 'src/types';

import { HomeNavigator, HomeTabParamList } from './HomeNavigator';
import { Stack } from './Stack';

export type AppStackParamList = {
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  HOME: NavigatorScreenParams<HomeTabParamList>;
  Main: undefined;
  // Messages: {
  //   matchId: string;
  //   match: Entity.Match;
  // };
  SIGN_IN: undefined;
  SIGN_IN_WITH_OTP_PHONE_NUMBER: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SIGN_IN_WITH_PHONE_NUMBER: undefined;
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

export const MainStack: React.FC = () => {
  console.log(111);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
          orientation: 'portrait',
        }}
        initialRouteName={SCREENS.Main}
      >
        <Stack.Group>
          <Stack.Screen name={SCREENS.Main} component={MainScreen} />
          <Stack.Screen name={SCREENS.HOME} component={HomeNavigator} />
          {/* <Stack.Screen name={SCREENS.LikedMe} component={LikedMeScreen} /> */}
          <Stack.Screen name={SCREENS.CREATE_BASIC_PROFILE} component={CreateBasicProfileScreen} />
          {/* <Stack.Screen name={SCREENS.CREATE_BASIC_PHOTOS} component={CreateBasicPhotosScreen} /> */}
          {/* <Stack.Screen name={SCREENS.ProfileEdit} component={ProfileEditScreen} /> */}
          <Stack.Screen name={SCREENS.ProfileSetting} component={ProfileSettingScreen} />
          {/* <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} /> */}
          {/* <Stack.Screen
            name={SCREENS.DATING_NEARBY_FILTER}
            component={DatingNearbyFilterScreen}
          ></Stack.Screen> */}
          {/* <Stack.Screen name={SCREENS.ChatProfile} component={ChatProfileScreen}></Stack.Screen> */}
          {/* <Stack.Screen
            name={SCREENS.LikedMeProfile}
            component={LikedMeProfileScreen}
          ></Stack.Screen> */}
          {/* <Stack.Screen name={SCREENS.EDIT_INFO_LOCATION} component={EditInfoLocationScreen} /> */}
          {/* <Stack.Screen name={SCREENS.SUBJECT} component={SubjectScreen} /> */}
          {/* Product */}
          <Stack.Screen name={SCREENS.PRODUCT_CREATE} component={CreateProductScreen} />
          <Stack.Screen name={SCREENS.PRODUCT} component={ProductScreen} />
          <Stack.Screen name={SCREENS.PRODUCT_SETTING} component={ProductSettingScreen} />

          {/* Order */}
          <Stack.Screen name={SCREENS.ORDER_CREATE} component={OrderCreateScreen} />
          <Stack.Screen name={SCREENS.ORDER_CONFIRM} component={OrderConfirmScreen} />
          <Stack.Screen name={SCREENS.ORDER_SETTING} component={OrderSettingScreen} />
          <Stack.Screen name={SCREENS.ORDER} component={OrderScreen} />
          <Stack.Screen name={SCREENS.ORDER_PAYMENT} component={OrderUpdatePaymentScreen} />
        </Stack.Group>

        {/* <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name={SCREENS.EditInfoHeight} component={EditInfoHeightScreen} />
          <Stack.Screen name={SCREENS.EditInfoNickname} component={EditInfoNicknameScreen} />
          <Stack.Screen name={SCREENS.EditInfoWeight} component={EditInfoWeightScreen} />
        </Stack.Group> */}
      </Stack.Navigator>
    </>
  );
};
