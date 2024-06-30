import { View } from '@gluestack-ui/themed';

import { CashItemActions } from './actions/cash-item-actions';

export const ContentCashItems = () => {
  return (
    <>
      <View flex={1} px={16}>
        <View flex={1}></View>
        <View mb={16}>
          <CashItemActions />
        </View>
      </View>
    </>
  );
};
