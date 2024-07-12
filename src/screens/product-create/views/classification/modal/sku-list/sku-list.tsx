import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { FormParams } from 'src/types';

export const SkuList: FC<{ skus: FormParams.CreateProductSku[] }> = ({ skus }) => {
  return (
    <>
      <View>
        {skus.map(sku => {
          console.log(4444);
          return <View key={sku.specificationIds.toString()}></View>;
        })}
      </View>
    </>
  );
};
