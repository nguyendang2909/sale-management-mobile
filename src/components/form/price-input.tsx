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
import React, { useCallback, useState } from 'react';
import { InputModeOptions } from 'react-native';
import { useMessages } from 'src/hooks';

import { MaterialIcons } from '../icon';
import { InputSlotClear } from './input';

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
  onFocus?: () => void;
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
  onFocus,
}) => {
  const { formatNumber, locale } = useMessages();

  const [isDisplayInputSlot, setDisplayInputSlot] = useState<boolean>(false);

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

  const handleFocus = useCallback(() => {
    setDisplayInputSlot(true);
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setDisplayInputSlot(false);
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

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
            onBlur={handleBlur}
            onFocus={handleFocus}
          ></InputField>
          {!!value && isDisplayInputSlot && <InputSlotClear onPress={handleClear} />}
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
