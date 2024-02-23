import _ from 'lodash';
import { Input, View } from 'native-base';
import React, { useRef } from 'react';
import { useAppSelector } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditIntroduceMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const introduceState = useAppSelector(state => state.app.profile?.introduce) || '';

  const handleDebounce = useRef(
    _.debounce((e: ApiRequest.UpdateProfile) => onPress(e), 3000),
  ).current;

  const handleChange = (e: string) => {
    handleDebounce({ introduce: e });
  };

  return (
    <>
      <View px={4} py={2}>
        <View>
          <Input
            maxLength={500}
            variant="unstyled"
            defaultValue={introduceState}
            onChangeText={handleChange}
          />
        </View>
      </View>
    </>
  );
};
