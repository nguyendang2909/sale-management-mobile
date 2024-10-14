import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from 'src/constants';
import { SignInScreen } from 'src/screens/sign-in/sign-in.screen';
import { SignInWithOtpPhoneNumberScreen } from 'src/screens/sign-in-with-otp-phone-number/sign-in-with-otp-phone-number.screen';
import { SignInWithPhoneNumberScreen } from 'src/screens/sign-in-with-phone-number/sign-in-with-phone-number.screen';

import { Stack } from './Stack';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={SCREENS.SIGN_IN}>
      <Stack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
      <Stack.Screen
        name={SCREENS.SIGN_IN_WITH_PHONE_NUMBER}
        component={SignInWithPhoneNumberScreen}
      />
      <Stack.Screen
        name={SCREENS.SIGN_IN_WITH_OTP_PHONE_NUMBER}
        component={SignInWithOtpPhoneNumberScreen}
      />
    </Stack.Navigator>
  );
};
