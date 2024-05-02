import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { AppStore } from '../types/app-store.type';

export const useAppSelector: TypedUseSelectorHook<AppStore.RootState> = useSelector;

export const createAppSelector = createSelector.withTypes<AppStore.RootState>();
