import { useCallback, useEffect, useState } from 'react';
import { useFetchOrdersQuery } from 'src/api';
import { Entity, OrderStatus } from 'src/types';

export const useOrders = ({ status }: { status?: OrderStatus }) => {
  const [orders, setOrders] = useState<Entity.Order[]>([]);

  const [_next, setNext] = useState<string | undefined>(undefined);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const {
    data: payload,
    isLoading,
    isFetching,
    refetch,
    ...rest
  } = useFetchOrdersQuery(
    {
      status,
      _next,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const loading = isLoading || isFetching;

  useEffect(() => {
    setOrders([]);
  }, [status]);

  const fetchNext = useCallback(() => {
    if (loading) {
      return;
    }
    if (payload?.pagination._next) {
      setNext(payload?.pagination._next);
    }
  }, [loading, payload?.pagination._next]);

  const refresh = useCallback(() => {
    if (loading) {
      return;
    }
    setNext(undefined);
  }, [loading]);

  useEffect(() => {
    if (payload) {
      setOrders(prev => {
        return prev.concat(...payload.data);
      });
    }
  }, [payload]);

  return {
    data: orders,
    refetch,
    isFetching,
    isLoading,
    fetchNext,
    refresh,
    ...rest,
  };
};
