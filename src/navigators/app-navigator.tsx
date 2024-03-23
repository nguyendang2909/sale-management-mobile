import React from 'react';
import { useAppSelector } from 'src/hooks';

import { AuthStack } from './AuthStack';
import { MainStack } from './main-stack';

export const AppNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.app.accessToken);

  return <>{isAuthenticated ? <MainStack /> : <AuthStack />}</>;
};
