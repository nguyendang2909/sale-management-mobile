import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';
import { FontAwesome, MenuItem } from 'src/components';
import { SUBJECTS } from 'src/constants/teacher.constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditLearningTargetMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const { formatMessage } = useMessages();
  const currentLearningTarget = useAppSelector(state => state.app.profile?.learningTarget);
  const [isInit, setInit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const handleChange = (learningTarget: string) => {
    onClose();
    onPress({ learningTarget });
  };
  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        title="Learning target"
        leftIcon={<FontAwesome name="search" />}
        {...(currentLearningTarget
          ? {
              value: currentLearningTarget,
            }
          : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                Learning target
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
                  <Text fontWeight={currentLearningTarget === value ? 'bold' : undefined}>
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
