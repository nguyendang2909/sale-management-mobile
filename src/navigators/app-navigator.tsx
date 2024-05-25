import React from 'react';
import { useAppSelector } from 'src/hooks';

import { AuthStack } from './auth.stack';
import { AuthProfileStack } from './auth-profile.stack';
import { MainStack } from './main.stack';

export const AppNavigator: React.FC = () => {
  const hasAccessToken = useAppSelector(state => !!state.app.accessToken);
  const hasUserId = useAppSelector(state => !!state.app.user.id);
  const hasShops = useAppSelector(state => !!state.app.shops);

  if (hasAccessToken && hasUserId && hasShops) {
    return <MainStack />;
  }

  if (hasAccessToken) {
    return <AuthProfileStack />;
  }

  return <AuthStack />;
};
