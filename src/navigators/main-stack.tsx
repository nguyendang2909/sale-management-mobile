import React from 'react';
import { SCREENS } from 'src/constants';
import {
  CreateBasicPhotosScreen,
  CreateBasicProfileScreen,
  DatingNearbyFilterScreen,
  MessagesScreen,
} from 'src/screens';
import { ChatProfileScreen } from 'src/screens/Conversations/ChatProfile';
import {
  EditInfoHeightScreen,
  EditInfoNicknameScreen,
  EditInfoWeightScreen,
  ProfileEditScreen,
} from 'src/screens/Me';
import { EditInfoLocationScreen } from 'src/screens/Me/EditInfoLocationScreen';
import { LikedMeScreen } from 'src/screens/Me/LikedMeScreen';
import { ProfileSettingScreen } from 'src/screens/Me/ProfileSettingScreen';
import { OrderConfirmScreen } from 'src/screens/order-confirm/order-confirm.screen';
import { OrderCreateScreen } from 'src/screens/order-create/order-create.screen';
import { OrderSettingScreen } from 'src/screens/order-setting/order-setting.screen';
import { MainScreen } from 'src/screens/Pre/MainScreen';
import { CreateProduct } from 'src/screens/product-create/create-product';
import { ProductDetailScreen } from 'src/screens/product-detail/product-detail';
import { ProductSettingScreen } from 'src/screens/product-setting/product-setting.screen';
import { LikedMeProfileScreen } from 'src/screens/Star/LikedMeProfileScreen';
import { SubjectScreen } from 'src/screens/subjects/subject-screen';
import { colors } from 'src/theme';

import { HomeNavigator } from './HomeNavigator';
import { Stack } from './Stack';

export const MainStack: React.FC = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
          orientation: 'portrait',
        }}
        initialRouteName={SCREENS.Main}
        // initialRouteName={SCREENS.CREATE_ORDER}
      >
        <Stack.Group>
          <Stack.Screen name={SCREENS.Main} component={MainScreen} />
          <Stack.Screen name={SCREENS.Home} component={HomeNavigator} />
          <Stack.Screen name={SCREENS.LikedMe} component={LikedMeScreen} />
          <Stack.Screen name={SCREENS.CREATE_BASIC_PROFILE} component={CreateBasicProfileScreen} />
          <Stack.Screen name={SCREENS.CREATE_BASIC_PHOTOS} component={CreateBasicPhotosScreen} />
          <Stack.Screen name={SCREENS.ProfileEdit} component={ProfileEditScreen} />
          <Stack.Screen name={SCREENS.ProfileSetting} component={ProfileSettingScreen} />
          <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} />
          <Stack.Screen
            name={SCREENS.DATING_NEARBY_FILTER}
            component={DatingNearbyFilterScreen}
          ></Stack.Screen>
          <Stack.Screen name={SCREENS.ChatProfile} component={ChatProfileScreen}></Stack.Screen>
          <Stack.Screen
            name={SCREENS.LikedMeProfile}
            component={LikedMeProfileScreen}
          ></Stack.Screen>
          <Stack.Screen name={SCREENS.EDIT_INFO_LOCATION} component={EditInfoLocationScreen} />
          <Stack.Screen name={SCREENS.SUBJECT} component={SubjectScreen} />
          {/* Product */}
          <Stack.Screen name={SCREENS.CREATE_PRODUCT} component={CreateProduct} />
          <Stack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
          <Stack.Screen name={SCREENS.PRODUCT_SETTING} component={ProductSettingScreen} />

          {/* Order */}
          <Stack.Screen name={SCREENS.ORDER_CREATE} component={OrderCreateScreen} />
          <Stack.Screen name={SCREENS.ORDER_CONFIRM} component={OrderConfirmScreen} />
          <Stack.Screen name={SCREENS.ORDER_SETTING} component={OrderSettingScreen} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name={SCREENS.EditInfoHeight} component={EditInfoHeightScreen} />
          <Stack.Screen name={SCREENS.EditInfoNickname} component={EditInfoNicknameScreen} />
          <Stack.Screen name={SCREENS.EditInfoWeight} component={EditInfoWeightScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};
