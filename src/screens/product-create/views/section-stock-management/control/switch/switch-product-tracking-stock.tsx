import { FC } from 'react';
import { FormControlSwitch } from 'src/components';

export const SwitchProductTrackingStock: FC<{
  value: boolean | null;
  onChange: (e: boolean | null) => void;
  setStock: (value: number | null) => void;
}> = ({ value, onChange, setStock }) => {
  const handleChange = (e: boolean) => {
    onChange(e ? null : e);
    setStock(e ? 0 : null);
  };

  return (
    <FormControlSwitch title="Theo dõi tồn kho" value={value === null} setValue={handleChange} />
  );
};
