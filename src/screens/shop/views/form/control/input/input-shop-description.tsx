import { FC } from 'react';
import { FormControlInput } from 'src/components';
import { ViewProps } from 'src/types';

export const InputShopDescription: FC<
  ViewProps & {
    value: string | null;
    onChange: (e: string | null) => void;
    onBlur?: () => void;
    errorMessage?: string;
  }
> = ({ value, onChange, onBlur, errorMessage, ...viewProps }) => {
  return (
    <FormControlInput
      label="Mô tả cửa hàng"
      maxLength={1000}
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: Chuyên bán đồ ăn nhanh"
      onBlur={onBlur}
      error={errorMessage}
      {...viewProps}
    />
  );
};
