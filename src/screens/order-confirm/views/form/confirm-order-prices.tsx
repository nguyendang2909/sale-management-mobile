import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Price } from 'src/components/text/formatted-price';
import { useAppSelector } from 'src/hooks';
import { AppStore, PickedOrderItems } from 'src/types';
import { productUtil } from 'src/utils/product.util';

export const ConfirmOrderPrices: FC<{
  pickedProducts: AppStore.Product[];
  cartItems: PickedOrderItems;
}> = ({ pickedProducts }) => {
  const cartItems = useAppSelector(s => s.cart.items);

  const { totalAmount, price, productQuantity } = useMemo(() => {
    return pickedProducts.reduce(
      (result, product) => {
        return {
          totalAmount:
            result.totalAmount +
            productUtil.getTotalAmountByOrderItem(product, cartItems[product.id]),
          price: result.price + productUtil.getPriceByOrderItem(product, cartItems[product.id]),
          productQuantity: result.productQuantity + cartItems[product.id].quantity,
        };
      },
      { totalAmount: 0, price: 0, productQuantity: 0 },
    );
  }, [cartItems, pickedProducts]);

  const diffPrice = useMemo(() => price - totalAmount, [price, totalAmount]);

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
