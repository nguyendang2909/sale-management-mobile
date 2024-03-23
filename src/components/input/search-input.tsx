import { Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed';
import { FC, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';

type FCProps = {
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
}) => {
  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    if (textInputRef.current && textInputRef.current.focus) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Input>
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          // @ts-ignore
          ref={textInputRef}
          focusable={focusable}
          placeholder={placeholder || 'Tìm kiếm'}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          value={value}
        />
      </Input>
    </>
  );
};
