import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FontAwesome5, MenuItem } from 'src/components';
import { useAppSelector } from 'src/hooks';

export const ProfileEditWeightMenuItem: React.FC = () => {
  const navigation = useNavigation();

  const value = useAppSelector(state => state.app.profile?.weight);

  const handleChange = () => {
    navigation.navigate('EditInfoWeight');
  };

  return (
    <>
      <MenuItem
        titleTx="Weight"
        leftIcon={<FontAwesome5 name="weight" />}
        {...(value ? { value: `${value} kg` } : {})}
        onPress={handleChange}
      />
    </>
  );
};
