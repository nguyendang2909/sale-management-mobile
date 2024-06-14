import React from 'react';
import { useAppSelector } from 'src/hooks';

import { AuthStack } from './auth.stack';
import { MainStack } from './main.stack';

export const AppNavigator: React.FC = () => {
  const hasAccessToken = useAppSelector(state => !!state.app.accessToken);
  const hasUserId = useAppSelector(state => !!state.app.user.id);

  if (hasAccessToken && hasUserId) {
    return <MainStack />;
  }

  return <AuthStack />;
};
