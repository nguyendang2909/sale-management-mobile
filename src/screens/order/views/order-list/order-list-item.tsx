import { Button, ButtonText, Divider, HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useMemo } from 'react';
import { FormattedTime } from 'react-intl';
import { TextPrice } from 'src/components/text/text-price';
import { SCREENS } from 'src/constants';
import { Entity } from 'src/types';
import { orderUtil } from 'src/utils';

import { OrderCardStatusTag } from '../tags/order-card-status-tag';

type FCProps = {
  order: Entity.Order;
  onDelete: (id: string) => void;
};

export const OrderListItem: FC<FCProps> = ({ order, onDelete }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.ORDER_DETAIL, { detail: order });
  };

  const totalAmount = useMemo(() => orderUtil.getTotalAmount(order), [order]);

  const handleDelete = useCallback(() => {
    onDelete(order.id);
  }, [onDelete, order.id]);

  const handleDelivery = useCallback(
    (order: Entity.Order) => {
      navigation.navigate(SCREENS.ORDER_PAYMENT, { order });
    },
    [navigation],
  );

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <View
            mx={16}
            my={8}
            bg={pressed ? '$backgroundLight200' : '$white'}
            px={16}
            borderWidth={1}
            borderColor="$backgroundLight200"
            borderRadius={8}
          >
            <View p={12}>
              <HStack>
                <View flex={1}>
                  <View>
                    <Text>{order.customer?.fullName ? order.customer?.fullName : 'Khách lẻ'}</Text>
                    <Text>
                      <FormattedTime
                        value={order.createdAt}
                        day="numeric"
                        month="long"
                        // year="numeric"
                        hour="numeric"
                        minute="numeric"
                        hour12={false}
                      />{' '}
                      - {order.code}
                    </Text>
                  </View>
                </View>
                <View>{!!order.status && <OrderCardStatusTag status={order.status} />}</View>
              </HStack>
              <Divider my={8} />
              <View>
                <HStack justifyContent="space-between">
                  <View>
                    <Text>Tổng cộng</Text>
                  </View>
                  <View>
                    <TextPrice value={totalAmount} />
                  </View>
                </HStack>
              </View>

              <View>
                <HStack columnGap={16} rowGap={16}>
                  <View flex={1}>
                    <Button variant="outline" onPress={handleDelete}>
                      <ButtonText>Huỷ</ButtonText>
                    </Button>
                  </View>
                  <View flex={1}>
                    <Button onPress={handleDelivery}>
                      <ButtonText>Đã giao</ButtonText>
                    </Button>
                  </View>
                </HStack>
              </View>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};
