import { useDispatch } from 'react-redux';
import { store } from 'src/store';

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
