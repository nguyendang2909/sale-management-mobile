import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { api, useLogoutMutation } from 'src/api';
import { useFetchMeQuery } from 'src/api/me.api';
import { useFetchSettingsQuery } from 'src/api/setting.api';
import { useGetManyShopsQuery } from 'src/api/shop.api';
import { LoadingOverlay } from 'src/components';
import { SCREENS } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { appActions } from 'src/store/app/app.store';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const refreshToken = useAppSelector(s => s.app.refreshToken);

  const { data: me, isError: isErrorGetMe } = useFetchMeQuery(undefined, {});
  const { data: shops, isError: isErrorGetShops } = useGetManyShopsQuery({});
  const { data: settings, isError: isErrorFetchSettings } = useFetchSettingsQuery();

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
    if (isErrorGetMe || isErrorGetShops || isErrorFetchSettings) {
      handleLogout();
    }
    if (me && shops && settings) {
      if (!shops.data.length) {
        navigation.dispatch(StackActions.replace(SCREENS.CREATE_BASIC_PROFILE));
        return;
      }
      navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: 'DatingSwipe' }));
    }
  }, [
    handleLogout,
    isErrorFetchSettings,
    isErrorGetMe,
    isErrorGetShops,
    me,
    navigation,
    settings,
    shops,
  ]);

  return <LoadingOverlay />;
};
