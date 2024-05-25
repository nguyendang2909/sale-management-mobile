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
import React, { useCallback } from 'react';
import { InputModeOptions } from 'react-native';
import { ViewProps } from 'src/types';

import { MaterialIcons } from '../icon';

type FCProps = ViewProps & {
  label: string;
  onChange: (e: string | null) => void;
  value?: string | null;
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
  ...viewProps
}) => {
  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const handleChangeText = (e: string) => {
    if (e) {
      onChange(e);
      return;
    }
    onChange(null);
  };

  return (
    <View {...viewProps}>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Input testID={testID} variant="underlined">
          <InputField
            focusable={focusable}
            inputMode={inputMode}
            value={value || undefined}
            onChangeText={handleChangeText}
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
      </FormControl>
    </View>
  );
};
