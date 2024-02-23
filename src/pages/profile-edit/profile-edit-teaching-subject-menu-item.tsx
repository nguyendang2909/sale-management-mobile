import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';
import { FontAwesome, MenuItem } from 'src/components';
import { SUBJECTS } from 'src/constants/teacher.constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditTeachingSubjectMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const { formatMessage } = useMessages();
  const currentTeachingSubject = useAppSelector(state => state.app.profile?.teachingSubject);
  const [isInit, setInit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (teachingSubject: string) => {
    onClose();
    onPress({ teachingSubject });
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        title="Teaching subject"
        leftIcon={<FontAwesome name="search" />}
        {...(currentTeachingSubject
          ? {
              value: currentTeachingSubject,
            }
          : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                Teaching subject
              </Heading>
            </Box>
            {SUBJECTS.map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text fontWeight={currentTeachingSubject === value ? 'bold' : undefined}>
                    {value}
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
