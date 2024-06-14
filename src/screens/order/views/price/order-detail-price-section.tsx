import { Button, ButtonIcon, ButtonText, HStack, Text, View } from '@gluestack-ui/themed';
import { CreditCard } from 'lucide-react-native';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';
import { orderItemUtil } from 'src/utils/order-item.util';

export const OrderPaymentSection: FC<ViewProps & { order: Entity.Order; amount: number }> = ({
  order,
  amount,
  ...viewProps
}) => {
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
            <Price value={amount} />
          </Text>
        </View>
      </HStack>

      <View mt={16}>
        <Button variant="outline">
          <ButtonIcon as={CreditCard} mr={8}></ButtonIcon>
          <ButtonText>Thanh toán</ButtonText>
        </Button>
      </View>
    </View>
  );
};
