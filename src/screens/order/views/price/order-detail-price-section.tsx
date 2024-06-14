import { Button, ButtonIcon, ButtonText, HStack, Text, View } from '@gluestack-ui/themed';
import { CreditCard } from 'lucide-react-native';
import { FC, useCallback, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';
import { orderItemUtil } from 'src/utils/order-item.util';

export const OrderPriceSection: FC<
  ViewProps & { order: Entity.Order; amount: number; shouldPay?: boolean }
> = ({ order, amount, shouldPay, ...viewProps }) => {
  const totalPromotional = useMemo(() => orderUtil.getTotalPromotional(order), [order]);
  const quantity = useMemo(() => orderItemUtil.getQuantities(order.items), [order.items]);

  const handlePressPay = useCallback(() => {
    navigate(SCREENS.ORDER_PAYMENT, {
      order,
      updateStatusDelivered: false,
    });
  }, [order]);

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

      {shouldPay && (
        <View mt={16}>
          <Button variant="outline" onPress={handlePressPay}>
            <ButtonIcon as={CreditCard} mr={8}></ButtonIcon>
            <ButtonText>Thanh toán</ButtonText>
          </Button>
        </View>
      )}
    </View>
  );
};
