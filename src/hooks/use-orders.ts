import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ORDER_STATUSES } from 'src/constants';
import { orderActions } from 'src/store/order';
import { ApiRequest, ApiResponse, OrderStoreStatus } from 'src/types';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useMessages } from './useMessages';

export const useOrders = ({
  status,
  lazyQuery,
}: {
  status?: OrderStoreStatus;
  lazyQuery: UseLazyQuery<
    QueryDefinition<ApiRequest.FindManyOrders, any, any, ApiResponse.Orders, 'api'>
  >;
}) => {
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const orders = useAppSelector(s => (status ? s.order[status].data : s.order.all.data));
  const _next = useAppSelector(s =>
    status ? s.order[status].pagination._next : s.order.all.pagination._next,
  );
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [fetchOrders, { isLoading, isFetching }] = lazyQuery();
  const loading = isLoading || isFetching;
  const deleteById = useCallback(
    (id: string) => {
      dispatch(orderActions.deleteOrder(id));
    },
    [dispatch],
  );

  const fetchFirstData = useCallback(async () => {
    try {
      const data = await fetchOrders({}).unwrap();
      dispatch(orderActions.setOrders({ status, data: data.data }));
      dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  }, [fetchOrders, dispatch, status, formatErrorMessage]);

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
  }, [_next, dispatch, fetchOrders, loading, status]);

  const refresh = useCallback(async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    try {
      const data = await fetchOrders({}).unwrap();
      dispatch(orderActions.setOrders({ status, data: data.data }));
      dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, fetchOrders, formatErrorMessage, loading, status]);

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
