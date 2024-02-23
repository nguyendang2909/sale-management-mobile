import _ from 'lodash';
import { Input, Text, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { useAppSelector } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditJobTitleMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const currentValue = useAppSelector(state => state.app.profile?.jobTitle) || '';
  const [value, setValue] = useState<string>(currentValue);

  const handleDebounce = useRef(
    _.debounce((e: ApiRequest.UpdateProfile) => onPress(e), 3000),
  ).current;

  const handleChange = (e: string) => {
    setValue(e);
    handleDebounce({ jobTitle: e });
  };

  return (
    <>
      <View px={4} py={4}>
        <View>
          <Input
            maxLength={100}
            variant="unstyled"
            defaultValue={currentValue}
            onChangeText={handleChange}
          />
        </View>
        <View>
          <Text textAlign="right">{100 - value.length}</Text>
        </View>
      </View>
    </>
  );
};
