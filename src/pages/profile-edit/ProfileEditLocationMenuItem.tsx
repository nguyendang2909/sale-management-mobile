import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Ionicons, MenuItem } from 'src/components';
import { SCREENS } from 'src/constants';
import { useAppSelector, useMessages } from 'src/hooks';

export const ProfileEditLocationMenuItem: React.FC = () => {
  const navigation = useNavigation();

  const { formatMessage } = useMessages();

  const state = useAppSelector(state => state.app.profile?.state);

  const locationText = `${state?.name}, ${state?.country?.native}`;

  const handleChange = () => {
    navigation.navigate(SCREENS.EDIT_INFO_LOCATION);
  };

  return (
    <>
      <MenuItem
        title={locationText || formatMessage('None')}
        leftIcon={<Ionicons name="location" />}
        onPress={handleChange}
      />
    </>
  );
};
