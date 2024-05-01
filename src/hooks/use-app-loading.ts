import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from 'src/store';

export const useAppLoading = (isLoading: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(1111, isLoading);
    dispatch(appActions.setAppLoading(isLoading));
  }, [dispatch, isLoading]);
};
