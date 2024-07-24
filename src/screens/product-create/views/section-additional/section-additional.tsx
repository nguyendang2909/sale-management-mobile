import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

import { FormControlProductAdditional } from './control/form-control-product-additional';

export const SectionAdditional: FC<ViewProps> = () => {
  return (
    <>
      <View>
        <View px={16}>
          <View>
            <Text>Thêm</Text>
          </View>
          <View flexDirection="row">
            <FormControlProductAdditional />
          </View>
        </View>
      </View>
    </>
  );
};
