import { Button, ButtonText, Divider, HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { FormattedTime } from 'react-intl';
import { TextPrice } from 'src/components/text/text-price';
import { ORDER_UNDELIVERED_STATUSES, SCREENS } from 'src/constants';
import { Entity } from 'src/types';
import { orderPaymentUtil, orderUtil } from 'src/utils';

import { OrderCardStatusTag } from '../tags/order-card-status-tag';
import { TextPaymentStatus } from './payment-status-text/text-payment-status';

type FCProps = {
  order: Entity.Order;
  onCancel: (id: string) => void;
};

export const OrderListItem: FC<FCProps> = ({ order, onCancel }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.ORDER, { detail: order });
  };

  const amount = useMemo(() => orderUtil.getAmount(order), [order]);

  const handleCancel = useCallback(() => {
    onCancel(order.id);
  }, [onCancel, order.id]);

  const handleDelivery = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_PAYMENT, { order, updateStatusDelivered: true });
  }, [navigation, order]);

  const paymentAmount = orderPaymentUtil.getAllAmount(order.payments || []);

  return (
    <Pressable onPress={handlePress}>
      {/* 
      // @ts-ignore */}
      {({ pressed }) => {
        return (
          <View
            mx={16}
            my={8}
            bg={pressed ? '$backgroundLight200' : '$white'}
            borderWidth={1}
            borderColor="$backgroundLight200"
            borderRadius={8}
            p={16}
          >
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
                  <TextPrice value={amount} variant="primary" />
                </View>
              </HStack>
              <View>
                <TextPaymentStatus
                  textAlign="right"
                  orderAmount={order.amount || 0}
                  paymentAmount={paymentAmount}
                />
              </View>
            </View>

            {_.includes(ORDER_UNDELIVERED_STATUSES, order.status) && (
              <View mt={8}>
                <HStack columnGap={16} rowGap={16}>
                  <View flex={1}>
                    <Button variant="outline" onPress={handleCancel} size="sm">
                      <ButtonText>Huỷ</ButtonText>
                    </Button>
                  </View>
                  <View flex={1}>
                    <Button onPress={handleDelivery} size="sm">
                      <ButtonText>Đã giao</ButtonText>
                    </Button>
                  </View>
                </HStack>
              </View>
            )}
          </View>
        );
      }}
    </Pressable>
  );
};
