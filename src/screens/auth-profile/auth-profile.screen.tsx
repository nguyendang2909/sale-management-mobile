import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchOrderSettingsQuery, useFetchProductSettingsQuery } from 'src/api';
import { useFetchInvoiceSettingsQuery } from 'src/api/invoice-setting.api';
import { useFetchMeQuery } from 'src/api/me.api';
import { useFetchAllShopsQuery } from 'src/api/shop.api';
import { LoadingOverlay } from 'src/components';
import { appActions } from 'src/store';

export const AuthProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { isError: isErrorGetShops } = useFetchAllShopsQuery(undefined, {
    refetchOnReconnect: true,
  });
  useFetchProductSettingsQuery(undefined, {
    refetchOnReconnect: true,
  });

  useFetchOrderSettingsQuery();

  useFetchInvoiceSettingsQuery();

  const { isError: isErrorGetMe } = useFetchMeQuery(undefined, {
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isErrorGetMe || isErrorGetShops) {
      dispatch(appActions.logout());
    }
  }, [dispatch, isErrorGetMe, isErrorGetShops]);

  return <LoadingOverlay isLoading={true} />;
};
