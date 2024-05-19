import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchProductSettingsQuery, useLogoutMutation } from 'src/api';
import { useFetchMeQuery } from 'src/api/me.api';
import { useFetchAllShopsQuery } from 'src/api/shop.api';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useAppSelector } from 'src/hooks';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const refreshToken = useAppSelector(s => s.app.refreshToken);

  const currentUser = useAppSelector(s => s.app.user);
  const shops = useAppSelector(s => s.app.shops);
  const shop = useAppSelector(s => s.app.shop);

  const { isError: isErrorGetMe } = useFetchMeQuery(undefined, {
    refetchOnReconnect: true,
  });
  const { data: shopData, isError: isErrorGetShops } = useFetchAllShopsQuery(undefined, {
    refetchOnReconnect: true,
  });
  const { isError: isErrorFetchProductSettings } = useFetchProductSettingsQuery(undefined, {
    refetchOnReconnect: true,
  });

  // const handleLogout = useCallback(async () => {
  //   try {
  //     if (refreshToken) {
  //       await logout({ refreshToken }).unwrap();
  //     }
  //   } catch (err) {}

  //   dispatch(appActions.logout());
  //   dispatch(api.util.resetApiState());
  // }, [dispatch, logout, refreshToken]);

  useEffect(() => {
    // if (isErrorGetMe || isErrorGetShops || isErrorFetchProductSettings) {
    //   handleLogout();
    // }
    if (currentUser.id) {
      if (shop.id) {
        navigation.dispatch(StackActions.replace(SCREENS.HOME, { screen: HOME_SCREENS.PRODUCTS }));
      }
      // if (!shops.length && !shopData?.data.length) {
      //   navigation.dispatch(StackActions.replace(SCREENS.CREATE_BASIC_PROFILE));
      // }
    }
  }, [currentUser, navigation, shop, shopData?.data.length, shops]);

  return <LoadingOverlay />;
};
