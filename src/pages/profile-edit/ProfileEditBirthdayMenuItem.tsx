import moment from 'moment';
import React, { useState } from 'react';
import { BirthdayPicker, MaterialCommunityIcons, MenuItem } from 'src/components';
import { useAppSelector, useDisclose } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditBirthdayMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const value = useAppSelector(state => state.app.profile?.birthday);
  const [isInit, setInit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const showDatePicker = () => {
    setInit(true);
    onOpen();
  };

  const handleConfirm = async (e: string) => {
    onClose();
    onPress({ birthday: e });
  };

  return (
    <>
      <MenuItem
        titleTx="Birthday"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { value: moment(value).format('YYYY-MM-DD') } : {})}
        onPress={showDatePicker}
      />
      {isInit && (
        <BirthdayPicker
          isOpen={isOpen}
          onCancel={onClose}
          onConfirm={handleConfirm}
          value={value}
        />
      )}
    </>
  );
};
