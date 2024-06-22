import { FC } from 'react';
import { FormControlInput } from 'src/components';
import { ViewProps } from 'src/types';

export const InputShopAddress: FC<
  ViewProps & {
    value: string | null;
    onChange: (e: string | null) => void;
    onBlur?: () => void;
    errorMessage?: string;
  }
> = ({ value, onChange, onBlur, errorMessage, ...viewProps }) => {
  return (
    <FormControlInput
      label="Địa chỉ"
      maxLength={200}
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: Cầu Giấy - Hà Nội"
      onBlur={onBlur}
      error={errorMessage}
      {...viewProps}
    />
  );
};
