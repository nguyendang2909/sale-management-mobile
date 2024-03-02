import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { api, useLogoutMutation } from 'src/api';
import { useGetMeQuery } from 'src/api/me.api';
import { useGetManyShopsQuery } from 'src/api/shop.api';
import { LoadingOverlay } from 'src/components';
import { SCREENS } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { appActions } from 'src/store/app.store';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const refreshToken = useAppSelector(s => s.app.refreshToken);

  const { data: me, isError: isErrorGetMe } = useGetMeQuery(undefined, {});
  const { data: shops, isError: isErrorGetShops } = useGetManyShopsQuery({});

  const handleLogout = useCallback(async () => {
    try {
      if (refreshToken) {
        await logout({ refreshToken }).unwrap();
      }
    } catch (err) {}

    dispatch(appActions.logout());
    dispatch(api.util.resetApiState());
  }, [dispatch, logout, refreshToken]);

  useEffect(() => {
    if (isErrorGetMe || isErrorGetShops) {
      handleLogout();
    }
    if (me && shops) {
      if (!shops.data.length) {
        navigation.dispatch(StackActions.replace(SCREENS.CREATE_BASIC_PROFILE));
        return;
      }
      navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: 'DatingSwipe' }));
    }
  }, [handleLogout, isErrorGetMe, isErrorGetShops, me, navigation, shops]);

  return <LoadingOverlay />;
};
