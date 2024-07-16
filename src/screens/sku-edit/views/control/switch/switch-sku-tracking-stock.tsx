import { FC } from 'react';
import { FormControlSwitch } from 'src/components';

export const SwitchSkuTrackingStock: FC<{
  value: boolean | null;
  onChange: (e: boolean | null) => void;
}> = ({ value, onChange }) => {
  const handleChange = (e: boolean) => {
    onChange(e ? null : e);
  };

  return (
    <FormControlSwitch title="Theo dõi tồn kho" value={value === null} setValue={handleChange} />
  );
};
