import { Input, InputField, InputIcon, InputSlot, SearchIcon, View } from '@gluestack-ui/themed';
import { FC, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { ViewProps } from 'src/types';

type FCProps = ViewProps & {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  focusable?: boolean;
  defaultValue?: string;
  value?: string;
};

export const SearchInput: FC<FCProps> = ({
  placeholder,
  onChangeText,
  focusable,
  defaultValue,
  value,
  ...viewProps
}) => {
  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    if (focusable) {
      if (textInputRef.current && textInputRef.current.focus) {
        textInputRef.current.focus();
      }
    }
  }, [focusable]);

  return (
    <View {...viewProps}>
      <Input>
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          focusable={focusable}
          placeholder={placeholder || 'Tìm kiếm'}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          value={value}
          // @ts-ignore
          ref={textInputRef}
        />
      </Input>
    </View>
  );
};
