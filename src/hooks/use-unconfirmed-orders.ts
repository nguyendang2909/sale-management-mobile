import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useLazyFetchUnconfirmedOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';
import { orderActions } from 'src/store/order';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useMessages } from './useMessages';

const status = ORDER_STATUSES.UNCONFIRMED;

export const useUnconfirmedOrders = () => {
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const orders = useAppSelector(s => s.order.unconfirmed.data);
  const _next = useAppSelector(s => s.order.unconfirmed.pagination._next);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const [fetchOrders, { isLoading, isFetching }] = useLazyFetchUnconfirmedOrdersQuery();
  const loading = isLoading || isFetching;

  const deleteById = useCallback(
    (id: string) => {
      dispatch(orderActions.deleteOrder(id));
    },
    [dispatch],
  );

  // const isFocused = useIsFocused();

  const fetchFirstData = useCallback(async () => {
    try {
      const data = await fetchOrders({
        status,
      }).unwrap();
      dispatch(orderActions.setOrders({ status, data: data.data }));
      dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  }, [dispatch, fetchOrders, formatErrorMessage]);

  useEffect(() => {
    fetchFirstData();
  }, [fetchFirstData]);

  const fetchNext = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!_next) {
      return;
    }
    const data = await fetchOrders({
      status: ORDER_STATUSES.UNCONFIRMED,
      _next,
    }).unwrap();
    dispatch(orderActions.setOrders({ status, data: data.data }));
    dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
  }, [_next, dispatch, fetchOrders, loading]);

  const refresh = useCallback(async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    try {
      const data = await fetchOrders({
        status,
      }).unwrap();
      dispatch(orderActions.setOrders({ status, data: data.data }));
      dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, fetchOrders, formatErrorMessage, loading]);

  return {
    data: orders,
    isFetching,
    isLoading,
    fetchNext,
    refresh,
    isRefreshing,
    deleteById,
  };
};
