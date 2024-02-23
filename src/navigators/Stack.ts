import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/types';

// Documentation: https://reactnavigation.org/docs/stack-navigator/
export const Stack = createNativeStackNavigator<AppStackParamList>();
