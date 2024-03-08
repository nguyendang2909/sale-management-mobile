import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  View,
} from '@gluestack-ui/themed';
import { Stack } from 'native-base';
import React from 'react';
import { InputModeOptions } from 'react-native';

import { MaterialIcons } from '../icon';

type FCProps = {
  label: string;
  onChange: (nickname: string) => void;
  value?: string;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
};

export const FormControlInput: React.FC<FCProps> = ({
  label,
  onChange,
  value,
  error,
  maxLength,
  placeholder,
  testID,
  isRequired,
  inputMode,
}) => {
  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Input size="lg" testID={testID} variant="underlined">
          <InputField
            inputMode={inputMode}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
          ></InputField>
        </Input>
        <View pb={12}>
          <FormControlError position="absolute">
            {/* 
            // @ts-ignore */}
            <FormControlErrorIcon as={MaterialIcons} name="error-outline"></FormControlErrorIcon>
            <FormControlErrorText>{error}</FormControlErrorText>
          </FormControlError>
        </View>
      </Stack>
    </FormControl>
  );
};
