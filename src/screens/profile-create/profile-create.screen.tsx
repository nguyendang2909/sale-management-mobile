import { StackActions, useNavigation } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import { SCREENS } from 'src/constants';
import { useShops } from 'src/hooks';

import { FormCreateProfile } from './views/form/form-create-profile';

export const ProfileCreateScreen: FC = () => {
  const { data: shops } = useShops();

  const navigation = useNavigation();

  useEffect(() => {
    if (shops.length) {
      navigation.dispatch(StackActions.replace(SCREENS.SHOPS));
    }
  }, [navigation, shops.length]);

  return <FormCreateProfile />;
};
