import React from 'react';
import { useAppSelector } from 'src/hooks';

import { AuthStack } from './AuthStack';
import { MainStack } from './main-stack';

export const AppNavigator: React.FC = () => {
  const accessToken = useAppSelector(state => state.app.accessToken);
  console.log(222, accessToken);

  return <>{accessToken ? <MainStack /> : <AuthStack />}</>;
};
