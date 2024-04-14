import {
  CloseCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  View,
} from '@gluestack-ui/themed';
import { Stack } from 'native-base';
import React, { useCallback } from 'react';
import { InputModeOptions } from 'react-native';

import { MaterialIcons } from '../icon';

type FCProps = {
  label: string;
  onChange: (e: string) => void;
  value?: string;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
  onBlur?: () => void;
  focusable?: boolean;
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
  onBlur,
  focusable,
}) => {
  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);
  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Input testID={testID} variant="underlined">
          <InputField
            focusable={focusable}
            inputMode={inputMode}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            onBlur={onBlur}
          ></InputField>
          {!!value && (
            <InputSlot onPress={handleClear}>
              <InputIcon as={CloseCircleIcon}></InputIcon>
            </InputSlot>
          )}
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
