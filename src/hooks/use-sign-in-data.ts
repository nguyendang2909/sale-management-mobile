import { useCallback, useEffect } from 'react';
import { useLazyFetchOrderSettingsQuery, useLazyFetchProductSettingsQuery } from 'src/api';
import { useLazyFetchInvoiceSettingsQuery } from 'src/api/invoice-setting.api';
import { useLazyFetchMeQuery } from 'src/api/me.api';
import { useLazyFetchAllShopsQuery } from 'src/api/shop.api';

import { useAppSelector } from './useAppSelector';

export const useUserData = () => {
  const accessToken = useAppSelector(s => s.app.accessToken);

  const [fetchAllShops, { isFetching: isFetchingAllShops }] = useLazyFetchAllShopsQuery();

  const [fetchAllProductSettings, { isFetching: isFetchingProductSetting }] =
    useLazyFetchProductSettingsQuery();

  const [fetchOrderSetting, { isFetching: isFetchingOrderSetting }] =
    useLazyFetchOrderSettingsQuery();

  const [fetchInvoiceSetting, { isFetching: isFetchingInvoiceSetting }] =
    useLazyFetchInvoiceSettingsQuery();

  const [fetchMe] = useLazyFetchMeQuery();

  const fetchData = useCallback(async () => {
    await Promise.all([
      fetchAllShops(),
      fetchAllProductSettings(),
      fetchOrderSetting(),
      fetchInvoiceSetting(),
      fetchMe(),
    ]);
  }, [fetchAllProductSettings, fetchAllShops, fetchInvoiceSetting, fetchMe, fetchOrderSetting]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, fetchData]);

  return {
    isFetching:
      isFetchingAllShops ||
      isFetchingProductSetting ||
      isFetchingOrderSetting ||
      isFetchingInvoiceSetting,
  };
};
