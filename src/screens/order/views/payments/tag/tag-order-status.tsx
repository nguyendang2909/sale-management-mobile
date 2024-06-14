import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { orderPaymentUtil } from 'src/utils';

export const PaymentStatusTag: FC<{ debt: number }> = ({ debt }) => {
  return (
    <View bgColor="$secondary100" px={8} py={2} borderRadius={100}>
      <Text size="xs" color={debt ? '$warning700' : '$success700'}>
        {orderPaymentUtil.getStatusTagTranslation(debt)}
      </Text>
    </View>
  );
};
