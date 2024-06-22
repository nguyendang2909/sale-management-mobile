import { FC } from 'react';
import { FormControlInput } from 'src/components';
import { ViewProps } from 'src/types';

export const InputShopPhone: FC<
  ViewProps & {
    value: string | null;
    onChange: (e: string | null) => void;
    onBlur?: () => void;
    errorMessage?: string;
  }
> = ({ value, onChange, onBlur, errorMessage, ...viewProps }) => {
  return (
    <FormControlInput
      label="Số điện thoại"
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: 0968786543"
      onBlur={onBlur}
      maxLength={20}
      error={errorMessage}
      inputMode="tel"
      {...viewProps}
    />
  );
};
