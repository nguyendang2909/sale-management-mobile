import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useShops } from 'src/hooks';

export const ShopsScreen: React.FC = () => {
  const navigation = useNavigation();

  const { data: shopData, isFetching } = useShops();

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => {
        if (!shopData.length) {
          navigation.dispatch(StackActions.replace(SCREENS.CREATE_BASIC_PROFILE));
          return;
        }
        if (shopData.length === 1) {
          navigation.dispatch(
            StackActions.replace(SCREENS.HOME, { screen: HOME_SCREENS.PRODUCTS }),
          );
        }
      }, 100);
    }
  }, [isFetching, navigation, shopData, shopData.length]);

  return <LoadingOverlay isLoading={isFetching} />;
};
