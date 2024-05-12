import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';
import { orderItemUtil } from 'src/utils/order-item.util';

export const OrderDetailPriceSection: FC<ViewProps & { order: Entity.Order }> = ({
  order,
  ...viewProps
}) => {
  const totalAmount = useMemo(() => orderUtil.getTotalAmount(order), [order]);
  const totalPromotional = useMemo(() => orderUtil.getTotalPromotional(order), [order]);
  const quantity = useMemo(() => orderItemUtil.getQuantities(order.items), [order.items]);

  return (
    <View {...viewProps}>
      <HStack justifyContent="space-between">
        <View>
          <Text>{`Tổng ${quantity} sản phẩm`}</Text>
        </View>
        <View>
          <Text>
            <Price value={order.price} />
          </Text>
        </View>
      </HStack>
      <HStack justifyContent="space-between">
        <View>
          <Text>Giảm giá</Text>
        </View>
        <View>
          <Text>
            <Price value={totalPromotional} />
          </Text>
        </View>
      </HStack>
      <HStack justifyContent="space-between">
        <View>
          <Text bold>Tổng cộng</Text>
        </View>
        <View>
          <Text bold>
            <Price value={totalAmount} />
          </Text>
        </View>
      </HStack>
    </View>
  );
};
