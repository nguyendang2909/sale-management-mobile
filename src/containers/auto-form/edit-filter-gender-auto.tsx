import React from 'react';
import Toast from 'react-native-toast-message';
import { useUpdateMyProfileFilterMutation } from 'src/api';
import { FilterGenderActionSheet, MaterialCommunityIcons, MenuItem } from 'src/components';
import { GENDER_MESSAGES, UserGender } from 'src/constants/constants';
import { useAppSelector, useDisclose, useMessages } from 'src/hooks';

export const EditFilterGenderAuto: React.FC = () => {
  const { formatErrorMessage } = useMessages();
  const [updateMyProfileFilter] = useUpdateMyProfileFilterMutation();
  const currentFilterGender = useAppSelector(s => s.app.profileFilter.gender);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = async (e: UserGender) => {
    try {
      await updateMyProfileFilter({ gender: e }).unwrap();
    } catch (error) {
      Toast.show({ text1: formatErrorMessage(error) });
    }
  };

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(currentFilterGender ? { valueTx: GENDER_MESSAGES[currentFilterGender] } : {})}
        onPress={onOpen}
      />
      <FilterGenderActionSheet
        isOpen={isOpen}
        onClose={onClose}
        value={currentFilterGender}
        onChange={handleChange}
      />
    </>
  );
};
