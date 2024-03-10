import { Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed';
import { FC } from 'react';

type FCProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
};

export const SearchInput: FC<FCProps> = ({ placeholder, onChangeText }) => {
  return (
    <>
      <Input>
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder={placeholder || 'Tìm kiếm'} onChangeText={onChangeText} />
      </Input>
    </>
  );
};
