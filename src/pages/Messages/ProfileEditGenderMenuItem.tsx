import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';
import { MaterialCommunityIcons, MenuItem } from 'src/components';
import { GENDERS } from 'src/constants';
import { GENDER_MESSAGES, UserGender } from 'src/constants/constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditGenderMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const { formatMessage } = useMessages();
  const currentValue = useAppSelector(state => state.app.profile?.gender);

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (gender: UserGender) => {
    onClose();
    onPress({ gender });
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(currentValue ? { valueTx: GENDER_MESSAGES[currentValue] } : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Gender')}
              </Heading>
            </Box>
            {Object.values(GENDERS).map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text fontWeight={currentValue === value ? 'bold' : undefined}>
                    {formatMessage(GENDER_MESSAGES[value])}
                  </Text>
                </Actionsheet.Item>
              );
            })}
          </Actionsheet.Content>
        </Actionsheet>
      )}
    </>
  );
};
