import { View } from '@gluestack-ui/themed';
import { FC } from 'react';

import { ButtonAddCashItem } from './buttons/button-add-cash-item';
import { ButtonSubtractCashItem } from './buttons/button-subtract-cash-item';

export const CashItemActions: FC = () => {
  return (
    <>
      <View flexDirection="row" gap={16}>
        <View flex={1}>
          <ButtonAddCashItem />
        </View>
        <View flex={1}>
          <ButtonSubtractCashItem />
        </View>
      </View>
    </>
  );
};
