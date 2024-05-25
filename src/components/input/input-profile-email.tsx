import { FC } from 'react';
import { FormControlInput } from 'src/components';
import { ViewProps } from 'src/types';

export const InputProfileEmail: FC<
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
      label="Email"
      value={value}
      onChange={onChange}
      placeholder="Ví dụ: abc@gmail.com"
      onBlur={onBlur}
      error={errorMessage}
      {...viewProps}
    />
  );
};
