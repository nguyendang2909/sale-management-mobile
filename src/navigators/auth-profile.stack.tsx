import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from 'src/constants';
import { AuthProfileScreen } from 'src/screens/auth-profile/auth-profile.screen';

import { Stack } from './Stack';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const AuthProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={SCREENS.AUTH_PROFILE}>
      <Stack.Screen name={SCREENS.AUTH_PROFILE} component={AuthProfileScreen} />
    </Stack.Navigator>
  );
};
