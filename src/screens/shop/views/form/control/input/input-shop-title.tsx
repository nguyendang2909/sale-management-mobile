import { FC } from 'react';
import { FormControlInput } from 'src/components';
import { ViewProps } from 'src/types';

export const InputShopTitle: FC<
  ViewProps & {
    value: string | null;
    onChange: (e: string | null) => void;
    onBlur?: () => void;
    errorMessage?: string;
  }
> = ({ value, onChange, onBlur, errorMessage, ...viewProps }) => {
  return (
    <FormControlInput
      isRequired
      label="Tên cửa hàng"
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: Quán vịt Vân Đình"
      onBlur={onBlur}
      error={errorMessage}
      {...viewProps}
    />
  );
};
