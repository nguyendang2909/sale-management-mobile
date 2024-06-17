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
  VStack,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import React, { forwardRef, useCallback } from 'react';
import { InputModeOptions } from 'react-native';

import { MaterialIcons } from '../icon';

type FCProps = {
  label: string;
  onChange: (e: number | null) => void;
  value?: number | null;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
  onBlur?: () => void;
  focusable?: boolean;
};

export const IntegerInput = forwardRef(
  (
    {
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
    }: FCProps,
    ref,
  ) => {
    const handleClear = useCallback(() => {
      onChange(null);
    }, [onChange]);

    const handleChange = useCallback(
      (e: string) => {
        if (e) {
          const eNumber = +e.replaceAll('.', '').replace(',', '');
          if (!isNaN(eNumber) && _.isNumber(eNumber)) {
            if (eNumber < Number.MAX_SAFE_INTEGER) {
              onChange(eNumber);
            }
            return;
          }
        }
        onChange(null);
      },
      [onChange],
    );

    return (
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
          </FormControlLabel>
          <Input testID={testID} variant="underlined">
            <InputField
              focusable={focusable}
              inputMode={inputMode}
              value={value ? value.toString() : '0'}
              onChangeText={handleChange}
              placeholder={placeholder}
              maxLength={maxLength}
              onBlur={onBlur}
              // @ts-ignore
              ref={ref}
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
        </VStack>
      </FormControl>
    );
  },
);
