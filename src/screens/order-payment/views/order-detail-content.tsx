import { Avatar, AvatarFallbackText, HStack, ScrollView, Text, View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { LoadingOverlay } from 'src/components';
import { Price } from 'src/components/text/formatted-price';
import { useOrder } from 'src/hooks';
import { Entity } from 'src/types';
import { orderUtil } from 'src/utils';
import { customerUtil } from 'src/utils/customer.util';

import { OrderItemListItem } from './order-item-list/order-item-list-item';

export const OrderDetailContent: FC<{ detail: Entity.Order }> = ({ detail }) => {
  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching,
  } = useOrder({
    detail,
  });

  const { quantity } = _.reduce(
    order.items,
    (result, item) => {
      return { quantity: item.quantity ? result.quantity + item.quantity : result.quantity };
    },
    {
      quantity: 0,
    },
  );

  const totalAmount = useMemo(() => orderUtil.getTotalAmount(order), [order]);
  const totalPromotional = useMemo(() => orderUtil.getTotalPromotional(order), [order]);

  return (
    <>
      <LoadingOverlay isLoading={isLoadingOrder} />
      <ScrollView>
        <View bg={'$white'} p={16}>
          <View>
            <View position="absolute" right={0}>
              <Text>{order.status}</Text>
            </View>
            <View>
              <Text color="$textLight900">{order.code}</Text>
            </View>
            <View>
              <Text size="sm">{orderUtil.getTime(order)}</Text>
            </View>
          </View>
        </View>

        <View bg={'$white'} p={16} mt={16}>
          <HStack alignItems="center" rowGap={16} columnGap={16}>
            <Avatar height={40} width={40} bgColor="$secondary300" size="md" borderRadius="$full">
              <AvatarFallbackText>{order.customer?.fullName}</AvatarFallbackText>
            </Avatar>
            <Text>{customerUtil.getFullName(order.customer)}</Text>
          </HStack>
        </View>

        <View bg={'$white'} py={16} mt={16}>
          <View>
            {order.items?.map(item => {
              return (
                <>
                  <OrderItemListItem orderItem={item} />
                </>
              );
            })}
          </View>
        </View>

        <View bg={'$white'} p={16} mt={16}>
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
      </ScrollView>
    </>
  );
};
