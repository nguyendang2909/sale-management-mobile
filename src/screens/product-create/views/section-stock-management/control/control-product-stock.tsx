import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC, useEffect, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { IntegerInput } from 'src/components/form/integer-input';
import { FormParams } from 'src/types';

export const ControlProductStock: FC<
  ComponentProps<typeof View> & {
    control: Control<FormParams.CreateProduct | FormParams.UpdateProduct, any>;
  }
> = ({ control, ...viewProps }) => {
  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    if (textInputRef.current && textInputRef.current.focus) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="skus.0.stock"
        render={({ field }) => (
          <View {...viewProps}>
            <IntegerInput
              label="Tồn kho"
              value={field.value || 0}
              onChange={field.onChange}
              focusable={true}
              ref={textInputRef}
              inputMode="numeric"
            />
          </View>
        )}
      ></Controller>
    </>
  );
};
