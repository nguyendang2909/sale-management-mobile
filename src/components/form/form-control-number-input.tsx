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
import _ from 'lodash';
import { Stack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { InputModeOptions } from 'react-native';
import { useMessages } from 'src/hooks';

import { MaterialIcons } from '../icon';

type FCProps = {
  label: string;
  onChange: (e: string | null) => void;
  value?: number;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
  onBlur?: () => void;
  focusable?: boolean;
};

export const FormControlNumberInput: React.FC<FCProps> = ({
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
  const [displayValue, setDisplayValue] = useState<string>('');
  const { formatNumber } = useMessages();

  const handleClear = useCallback(() => {
    onChange(null);
    setDisplayValue('');
  }, [onChange]);

  const handleChange = useCallback(
    (e: string) => {
      if (e) {
        const eNumber = +e.replaceAll('.', '');
        if (!isNaN(eNumber) && _.isNumber(eNumber)) {
          if (eNumber < Number.MAX_SAFE_INTEGER) {
            setDisplayValue(formatNumber(eNumber));
            onChange(e);
          }
          return;
        }
      }
      setDisplayValue('');
      onChange(null);
    },
    [formatNumber, onChange],
  );

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
            value={displayValue}
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
      </Stack>
    </FormControl>
  );
};
