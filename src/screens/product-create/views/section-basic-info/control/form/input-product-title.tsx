import { FC } from 'react';
import { FormControlInput } from 'src/components';

export const InputProductTitle: FC<{
  value: string;
  onChange: (e: string | null) => void;
  onBlur?: () => void;
  errorMessage?: string;
}> = ({ value, onChange, onBlur, errorMessage }) => {
  return (
    <FormControlInput
      isRequired
      label="Tên sản phẩm"
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: Tương ớt Chinsu"
      onBlur={onBlur}
      error={errorMessage}
    />
  );
};
