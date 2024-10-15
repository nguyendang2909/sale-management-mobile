import { Divider, HStack, Text, View, VStack } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { OrderItemPrices } from 'src/components/text/order-item-prices';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { useAppDispatch } from 'src/hooks';
import { Entity } from 'src/types';

type FCProps = {
  orderItem: Entity.OrderItem;
};

export const OrderItemListItem: FC<FCProps> = ({ orderItem }) => {
  const dispatch = useAppDispatch();

  const { quantity, imagePath } = orderItem;

  return (
    <View>
      <View bg="$white" px={16}>
        <HStack columnGap={8} py={8}>
          <View>
            <ProductIconBox url={imagePath} />
          </View>
          <VStack flex={1}>
            <View height={22}>
              <Text lineHeight={22} numberOfLines={1}>
                {orderItem.title}
              </Text>
            </View>
            <HStack height={21} justifyContent="space-between">
              <View>
                <Text lineHeight={21}>{''}</Text>
              </View>
              <View>
                <Text lineHeight={21}>{`x${quantity}`}</Text>
              </View>
            </HStack>
            <HStack height={21} justifyContent="space-between">
              <View></View>
              <View>
                <Text lineHeight={21}>
                  <OrderItemPrices orderItem={orderItem} />
                </Text>
              </View>
            </HStack>
            <Divider mt={8} />
          </VStack>
        </HStack>
      </View>
    </View>
  );
};
