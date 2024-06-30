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
import React, { forwardRef, useCallback, useState } from 'react';
import { InputModeOptions } from 'react-native';
import { ViewProps } from 'src/types';

import { MaterialIcons } from '../icon';
import { InputSlotClear } from './input';

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
  onFocus?: () => void;
};

export const FormControlInput = forwardRef(
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
      onFocus,
      ...viewProps
    }: FCProps,
    ref,
  ) => {
    const [isDisplayInputSlot, setDisplayInputSlot] = useState<boolean>(false);

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
              onBlur={handleBlur}
              onFocus={handleFocus}
              // @ts-ignore
              ref={ref}
            ></InputField>
            {!!value && isDisplayInputSlot && <InputSlotClear onPress={handleClear} />}
          </Input>
          <View pb={16}>
            <FormControlError position="absolute" left={0} right={0}>
              {/* 
        // @ts-ignore */}
              <FormControlErrorIcon as={MaterialIcons} name="error-outline"></FormControlErrorIcon>
              <FormControlErrorText numberOfLines={1}>{error}</FormControlErrorText>
            </FormControlError>
          </View>
        </FormControl>
      </View>
    );
  },
);
