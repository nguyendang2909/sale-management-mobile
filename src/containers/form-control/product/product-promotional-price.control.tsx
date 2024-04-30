import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlNumberInput } from 'src/components/form/form-control-number-input';
import { useAppSelector } from 'src/hooks';

export const ProductPromotionalPriceControl: FC<
  ComponentProps<typeof View> & { control: Control<any, any> }
> = ({ control, ...viewProps }) => {
  const showCreateProductPromotionPrice = useAppSelector(
    s => s.app.productSettings.showCreateProductPromotionPrice,
  );
  return (
    <>
      <Controller
        control={control}
        name="skus.0.promotionalPrice"
        render={({ field, fieldState }) => {
          if (!!showCreateProductPromotionPrice || !!field.value) {
            return (
              <View {...viewProps}>
                <FormControlNumberInput
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
