import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormParams, ViewProps } from 'src/types';

import { ProductInStockControl } from '../form/form-control-product-in-stock';
import { ProductSkuControl } from '../form/product-sku.control';
import { ProductStockControl } from '../form/product-stock.control';
import { ProductTrackingStockControl } from '../form/product-tracking-stock.control';

export const SectionStockManagement: FC<
  ViewProps & {
    control: Control<FormParams.CreateProduct, any>;
    isEnabled: boolean;
    isTrackingStock: boolean;
  }
> = ({ control, isEnabled, isTrackingStock, ...viewProps }) => {
  if (!isEnabled) {
    return null;
  }
  return (
    <>
      <View px={16} py={16} bgColor="$white" {...viewProps}>
        <View>
          <Text fontWeight="$bold">Quản lý tồn kho</Text>
        </View>
        <ProductSkuControl mt={16} control={control} />
        {!isTrackingStock && <ProductInStockControl mt={16} control={control} />}
        <ProductTrackingStockControl mt={16} control={control} />
        {isTrackingStock && <ProductStockControl mt={16} control={control} />}
      </View>
    </>
  );
};
