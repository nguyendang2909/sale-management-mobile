import { Input, InputField, InputIcon, InputSlot, SearchIcon, View } from '@gluestack-ui/themed';
import { forwardRef } from 'react';
import { ViewProps } from 'src/types';

type FCProps = ViewProps & {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  focusable?: boolean;
  defaultValue?: string;
  value?: string;
};

export const InputSearch = forwardRef(
  ({ placeholder, onChangeText, focusable, defaultValue, value, ...viewProps }: FCProps, ref) => {
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
            ref={ref}
          />
        </Input>
      </View>
    );
  },
);
