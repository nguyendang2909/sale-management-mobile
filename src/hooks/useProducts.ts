import { useEffect } from 'react';
import { useFetchAllProductsQuery } from 'src/api';
import { productActions } from 'src/store';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useProducts = () => {
  const data = useAppSelector(s => s.product.data);
  const dispatch = useAppDispatch();

  const { data: fetchData, refetch } = useFetchAllProductsQuery({});

  useEffect(() => {
    if (fetchData?.data) {
      dispatch(productActions.setProducts(fetchData.data));
    }
  }, [dispatch, fetchData]);

  return {
    data,
    refetch,
  };
};
