import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ButtonClipboard } from 'src/components/clipboard/button-clipboard';
import { OrderCardStatusTag } from 'src/screens/orders/views/tags/order-card-status-tag';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';

export const OrderOverviewSection: FC<ViewProps & { order: Entity.Order }> = ({
  order,
  ...viewProps
}) => {
  return (
    <View {...viewProps}>
      <View>
        {order.status && (
          <View position="absolute" right={0}>
            <OrderCardStatusTag status={order.status} />
          </View>
        )}
        <HStack alignItems="center" columnGap={8}>
          <Text color="$textLight900">{order.code}</Text>
          <View>
            <ButtonClipboard value={order.code} />
          </View>
        </HStack>

        <View>
          <Text size="sm">{orderUtil.getTime(order)}</Text>
        </View>
      </View>
    </View>
  );
};
