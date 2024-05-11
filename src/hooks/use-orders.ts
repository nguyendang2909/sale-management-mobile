import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useLazyFetchOrdersQuery } from 'src/api';
import { ApiResponse, Entity, OrderStatus } from 'src/types';

import { useMessages } from './useMessages';

export const useOrders = ({ status }: { status?: OrderStatus }) => {
  const [orders, setOrders] = useState<Entity.Order[]>([]);

  const { formatErrorMessage } = useMessages();

  const [pagination, setPagination] = useState<ApiResponse.Pagination>({
    _next: null,
    _prev: null,
  });
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const [fetchOrders, { isLoading, isFetching }] = useLazyFetchOrdersQuery();
  const loading = isLoading || isFetching;

  const setData = (data: ApiResponse.Orders) => {
    setOrders(data.data);
    setPagination(data.pagination);
  };

  const deleteById = useCallback((id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  }, []);

  const fetchFirstData = useCallback(async () => {
    try {
      const data = await fetchOrders({
        status,
      }).unwrap();
      setOrders(data.data);
      setPagination(data.pagination);
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(111);
    fetchFirstData();
  }, [fetchFirstData, isFocused]);

  const fetchNext = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!pagination._next) {
      return;
    }
    const data = await fetchOrders({
      status,
      _next: pagination._next,
    }).unwrap();
    setPagination(data.pagination);
    setOrders(prev => {
      return _.chain(data.data)
        .concat(...prev)
        .uniqBy('id')
        .orderBy('createdAt')
        .value();
    });
  }, [fetchOrders, loading, pagination._next, status]);

  const refresh = useCallback(async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    try {
      const data = await fetchOrders({
        status,
      }).unwrap();
      setData(data);
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    } finally {
      setRefreshing(false);
    }
  }, [fetchOrders, formatErrorMessage, loading, status]);

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
