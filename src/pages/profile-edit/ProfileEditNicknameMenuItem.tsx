import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MaterialIcons, MenuItem } from 'src/components';
import { useAppSelector } from 'src/hooks';

export const ProfileEditNicknameMenuItem: React.FC = () => {
  const value = useAppSelector(state => state.app.profile?.nickname);

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('EditInfoNickname');
  };

  return (
    <>
      <MenuItem
        titleTx="Nickname"
        leftIcon={<MaterialIcons name="person" />}
        {...(value ? { value: `${value}` } : {})}
        onPress={onPress}
      />
    </>
  );
};
