import { View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { FC, useCallback, useMemo } from 'react';
import { useAppDispatch, useSearchProducts } from 'src/hooks';
import { AppStore, ProductWithQuantity } from 'src/types';

import { ConfirmOrderItem } from './confirm-order-item';

export const ConfirmOrderItemList: FC<{ orderItems: ProductWithQuantity[] }> = ({ orderItems }) => {
  const dispatch = useAppDispatch();
  const { data: products } = useSearchProducts();
  const navigation = useNavigation();

  const objProducts: Record<string, AppStore.Product> = useMemo(
    () =>
      products.reduce((acc, product) => {
        return { ...acc, [product.id]: product };
      }, {}),
    [products],
  );

  const handleAdd = useCallback(
    (productId: string) => {
      // setOrderItemsObj(prev => {
      //   if (!objProducts[productId]) {
      //     return prev;
      //   }
      //   if (
      //     !_.isNil(objProducts[productId].stock) &&
      //     objProducts[productId].stock! <= (prev[productId]?.quantity || 0)
      //   ) {
      //     Toast.show({ text1: 'Vượt quá số lượng sản phẩm tồn kho', type: 'error' });
      //     return prev;
      //   }
      //   if (!prev[productId]) {
      //     return {
      //       ...prev,
      //       [productId]: {
      //         quantity: 1,
      //         productId,
      //       },
      //     };
      //   }
      //   return { ...prev, [productId]: { quantity: prev[productId].quantity + 1, productId } };
      // });
    },
    [objProducts],
  );

  const handleSubtract = useCallback((productId: string) => {
    // setOrderItemsObj(prev => {
    //   if (!prev[productId]) {
    //     return prev;
    //   }
    //   if (prev[productId].quantity === 1) {
    //     return _.omit(prev, productId);
    //   }
    //   return {
    //     ...prev,
    //     [productId]: {
    //       quantity: prev[productId].quantity - 1,
    //       productId,
    //     },
    //   };
    // });
  }, []);

  const handleSet = useCallback((productId: string, quantity: number) => {
    // setOrderItemsObj(prev => ({ ...prev, [productId]: { quantity, productId } }));
  }, []);

  const handlePressNext = () => {
    // dispatch(cartActions.setCartItems(orderItemsObj));
    // navigation.navigate(SCREENS.ORDER_CONFIRM);
  };

  return (
    <View flex={1} height={1000}>
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={orderItems}
        keyExtractor={(item, index) => item.id || index.toString()}
        extraData={{
          a: 1,
        }}
        renderItem={({ item }) => {
          return (
            <ConfirmOrderItem
              product={item}
              onAdd={handleAdd}
              onSubtract={handleSubtract}
              onSet={handleSet}
              quantity={5}
            />
          );
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
    </View>
  );
};
