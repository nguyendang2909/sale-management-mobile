import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { ProductWithQuantity } from 'src/types';
import { productUtil } from 'src/utils/product.util';

export const ConfirmOrderPrices: FC<{
  orderItems: ProductWithQuantity[];
}> = ({ orderItems }) => {
  const { totalAmount, price, productQuantity } = useMemo(() => {
    return orderItems.reduce(
      (result, orderItem) => {
        return {
          totalAmount: result.totalAmount + productUtil.getPriceWithQuantity(orderItem),
          price: result.price + productUtil.getOriginalPriceWithQuantity(orderItem),
          productQuantity: result.productQuantity + (orderItem.quantity || 0),
        };
      },
      { totalAmount: 0, price: 0, productQuantity: 0 },
    );
  }, [orderItems]);

  const diffPrice = price - totalAmount;

  return (
    <>
      <HStack justifyContent="space-between">
        <View>
          <Text>{`Tổng ${productQuantity} sản phẩm`}</Text>
        </View>
        <View>
          <Text color="$textLight900" bold>
            <Price value={totalAmount} />
          </Text>
        </View>
      </HStack>
      {diffPrice > 0 && (
        <HStack justifyContent="space-between">
          <View>
            <Text>
              Giảm giá <Price value={price - totalAmount}></Price>
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
