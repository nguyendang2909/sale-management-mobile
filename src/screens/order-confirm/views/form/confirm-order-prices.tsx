import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { useAppSelector } from 'src/hooks';
import { Entity } from 'src/types';
import { skuUtil } from 'src/utils';

export const ConfirmOrderPrices: FC<{
  pickedSkus: Entity.Sku[];
}> = ({ pickedSkus }) => {
  const cartItems = useAppSelector(s => s.cart.items);

  const { amount, price, quantity } = useMemo(() => {
    return pickedSkus.reduce(
      (result, sku) => {
        const cartItem = cartItems[sku.id];
        if (!cartItem) {
          return {
            amount: result.amount,
            price: result.price,
            quantity: result.quantity,
          };
        }
        return {
          amount: result.amount + skuUtil.getAmountByCartItem(cartItem, sku),
          price: result.price + skuUtil.getPriceByCartItem(cartItem, sku),
          quantity: result.quantity + cartItem.quantity,
        };
      },
      { amount: 0, price: 0, quantity: 0 },
    );
  }, [cartItems, pickedSkus]);

  const diffPrice = useMemo(() => price - amount, [price, amount]);

  return (
    <>
      <HStack justifyContent="space-between">
        <View>
          <Text>{`Tổng ${quantity} sản phẩm`}</Text>
        </View>
        <View>
          <Text color="$textLight900" bold>
            <Price value={amount} />
          </Text>
        </View>
      </HStack>
      {diffPrice > 0 && (
        <HStack justifyContent="space-between">
          <View>
            <Text>
              Giảm giá <Price value={price - amount}></Price>
            </Text>
          </View>
          <View>
            <Text color="$textDark600" textDecorationLine="line-through">
              <Price value={price} />
            </Text>
          </View>
        </HStack>
      )}
    </>
  );
};
