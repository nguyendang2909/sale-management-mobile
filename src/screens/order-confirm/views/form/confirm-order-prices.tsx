import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { ProductWithQuantity } from 'src/types';
import { productUtil } from 'src/utils/product.util';

export const ConfirmOrderPrices: FC<{
  orderItems: ProductWithQuantity[];
}> = ({ orderItems }) => {
  const { payoutPrice, originalPrice, productQuantity } = useMemo(() => {
    return orderItems.reduce(
      (result, orderItem) => {
        return {
          payoutPrice: result.payoutPrice + productUtil.getPriceWithQuantity(orderItem),
          originalPrice: result.originalPrice + productUtil.getOriginalPriceWithQuantity(orderItem),
          productQuantity: result.productQuantity + (orderItem.quantity || 0),
        };
      },
      { payoutPrice: 0, originalPrice: 0, productQuantity: 0 },
    );
  }, [orderItems]);

  const diffPrice = originalPrice - payoutPrice;

  return (
    <>
      <HStack justifyContent="space-between">
        <View>
          <Text>{`Tổng ${productQuantity} sản phẩm`}</Text>
        </View>
        <View>
          <Text color="$textLight900" bold>
            <Price value={payoutPrice} />
          </Text>
        </View>
      </HStack>
      {diffPrice > 0 && (
        <HStack justifyContent="space-between">
          <View>
            <Text>
              Giảm giá <Price value={originalPrice - payoutPrice}></Price>
            </Text>
          </View>
          <View>
            <Text color="$textDark600" textDecorationLine="line-through">
              <Price value={originalPrice} />
            </Text>
          </View>
        </HStack>
      )}
    </>
  );
};
