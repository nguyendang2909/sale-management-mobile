import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputSlot,
  View,
} from '@gluestack-ui/themed';
import React, { forwardRef } from 'react';
import { InputModeOptions } from 'react-native';
import { ViewProps } from 'src/types';

import { MaterialIcons } from '../icon';

type FCProps = ViewProps & {
  label?: string;
  value?: string | null;
  onChange: (e: string | null) => void;
  defaultValue?: string | null;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  inputMode?: InputModeOptions | undefined;
  onBlur?: () => void;
  focusable?: boolean;
  onFocus?: () => void;
  onSubmit: () => void;
};

export const FormControlInputSave = forwardRef(
  (
    {
      label,
      defaultValue,
      error,
      maxLength,
      placeholder,
      testID,
      isRequired,
      inputMode,
      onBlur,
      focusable,
      onFocus,
      onSubmit,
      value,
      onChange,
      ...viewProps
    }: FCProps,
    ref,
  ) => {
    // const [isDisplayInputSlot, setDisplayInputSlot] = useState<boolean>(false);

    // const handleClear = useCallback(() => {
    //   onChange(null);
    // }, [onChange]);

    return (
      <View {...viewProps}>
        <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
          {!!label && (
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
          )}
          <Input testID={testID} variant="underlined">
            <InputField
              focusable={focusable}
              inputMode={inputMode}
              defaultValue={defaultValue || undefined}
              value={value || undefined}
              onChangeText={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              onBlur={onBlur}
              onFocus={onFocus}
              clearButtonMode="while-editing"
              onSubmitEditing={onSubmit}
              // @ts-ignore
              ref={ref}
            ></InputField>
            <InputSlot flexDirection="row" gap={8}>
              {/* {!!value && isDisplayInputSlot && (
                <TouchableOpacity onPress={handleClear}>
                  <InputIcon size="xl" as={CloseCircleIcon}></InputIcon>
                </TouchableOpacity>
              )} */}

              <Button size="xs" onPress={onSubmit}>
                <ButtonText>Lưu</ButtonText>
              </Button>
            </InputSlot>
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
