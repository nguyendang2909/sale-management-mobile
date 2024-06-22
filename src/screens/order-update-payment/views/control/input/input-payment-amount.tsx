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
  VStack,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { InputModeOptions, TextInput } from 'react-native';
import { useMessages } from 'src/hooks';

import { MaterialIcons } from '../../../../../components/icon';
import { MissingAmount } from './components/missing-amount';

type FCProps = {
  label: string;
  onChange: (e: number | null) => void;
  value: number | null;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
  onBlur?: () => void;
  focusable?: boolean;
  currentMissingAmount: number;
};

export const InputPaymentAmount = forwardRef<TextInput, FCProps>(
  (
    {
      label,
      onChange,
      value,
      error,
      maxLength,
      placeholder,
      testID,
      inputMode,
      onBlur,
      focusable,
      currentMissingAmount,
    },
    ref,
  ) => {
    const { formatNumber } = useMessages();

    const missingAmount = useMemo(
      () => currentMissingAmount - (value || 0),
      [currentMissingAmount, value],
    );

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
      <FormControl isInvalid={!!error}>
        <VStack>
          <FormControlLabel justifyContent="center">
            <FormControlLabelText color="$coolGray500">{label}</FormControlLabelText>
          </FormControlLabel>
          <Input testID={testID} variant="underlined" borderBottomWidth={0}>
            <InputField
              textAlign="center"
              fontSize={28}
              lineHeight={32}
              focusable={focusable}
              inputMode={inputMode}
              value={getDisplayValue(value)}
              onChangeText={handleChange}
              placeholder={placeholder}
              maxLength={maxLength}
              onBlur={onBlur}
              // @ts-ignore
              ref={ref}
            ></InputField>
          </Input>
          <View pb={12}>
            <FormControlError position="absolute">
              <FormControlErrorIcon
                as={MaterialIcons}
                // @ts-ignore
                name="error-outline"
              ></FormControlErrorIcon>
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </View>

          <MissingAmount missingAmount={missingAmount} alignItems="center" />
        </VStack>
      </FormControl>
    );
  },
);
