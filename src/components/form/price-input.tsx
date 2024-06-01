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
import React, { useCallback } from 'react';
import { InputModeOptions } from 'react-native';
import { useMessages } from 'src/hooks';

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

export const PriceInput: React.FC<FCProps> = ({
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
  const { formatNumber, locale } = useMessages();

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

  const getDisplayValue = (e?: number | null) => {
    if (e) {
      return formatNumber(e);
    }
    return '';
  };

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
            value={getDisplayValue(value)}
            onChangeText={handleChange}
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
      </VStack>
    </FormControl>
  );
};
