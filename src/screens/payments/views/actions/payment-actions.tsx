import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

import { ButtonAddPayment } from './buttons/button-add-payment';
import { ButtonSubtractPayment } from './buttons/button-subtract-payment';

export const PaymentActions: FC<ViewProps> = ({ ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View flexDirection="row" gap={16}>
        <View flex={1}>
          <ButtonSubtractPayment />
        </View>
        <View flex={1}>
          <ButtonAddPayment />
        </View>
      </View>
    </View>
  );
};
