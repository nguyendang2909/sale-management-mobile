import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PriceInput } from 'src/components/form/price-input';
import { useAppSelector } from 'src/hooks';
import { FormParams } from 'src/types';

export const ControlVariantPromotionalPrice: FC<
  ComponentProps<typeof View> & { control: Control<FormParams.EditSku, any> }
> = ({ control, ...viewProps }) => {
  const showPromotionalPrice = useAppSelector(s => s.app.productSettings.showPromotionalPrice);
  return (
    <>
      <Controller
        control={control}
        name="promotionalPrice"
        render={({ field, fieldState }) => {
          if (!!showPromotionalPrice || !!field.value) {
            return (
              <View {...viewProps}>
                <PriceInput
                  label="Giá khuyến mãi"
                  inputMode="numeric"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0.000"
                  error={fieldState.error?.message}
                />
              </View>
            );
          }
          return <></>;
        }}
      ></Controller>
    </>
  );
};
