import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
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
    QueryDefinition<
      { shopId: string; params: ApiRequest.FindManyOrders },
      any,
      any,
      ApiResponse.Orders,
      'api'
    >
  >;
}) => {
  const shopId = useAppSelector(s => s.shop.current.id);
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const orders = useAppSelector(s => (status ? s.order[status].data : s.order.all.data));
  const _next = useAppSelector(s =>
    status ? s.order[status].pagination._next : s.order.all.pagination._next,
  );
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [fetchOrders, { isLoading, isFetching }] = lazyQuery();
  const loading = isLoading || isFetching;

  const fetchFirstData = useCallback(async () => {
    try {
      const data = await fetchOrders({
        shopId,
        params: {
          status,
        },
      }).unwrap();
      dispatch(orderActions.setOrders({ status, data: data.data }));
      dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  }, [fetchOrders, shopId, status, dispatch, formatErrorMessage]);

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
      shopId,
      params: {
        status,
        _next,
      },
    }).unwrap();
    dispatch(orderActions.setOrders({ status, data: data.data }));
    dispatch(orderActions.setPagination({ status, pagination: data.pagination }));
  }, [_next, dispatch, fetchOrders, loading, shopId, status]);

  const refresh = useCallback(async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    try {
      const data = await fetchOrders({
        shopId,
        params: {
          status,
        },
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
  }, [dispatch, fetchOrders, formatErrorMessage, loading, shopId, status]);

  return {
    data: orders,
    isFetching,
    isLoading,
    fetchNext,
    refresh,
    isRefreshing,
  };
};

export type UserOrder = ReturnType<typeof useOrders>;
