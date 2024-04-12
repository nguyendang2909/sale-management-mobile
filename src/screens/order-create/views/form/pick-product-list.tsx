import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  View,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import _ from 'lodash';
import { ShoppingCart } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SCREENS } from 'src/constants';
import { useAppDispatch, useAppSelector, useSearchProducts } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { AppStore, PickedOrderItem } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { PickProduct } from './pick-product-list-item';

export const PickProducts = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useSearchProducts();
  const cartItems = useAppSelector(s => s.cart.items);
  const orderItems = useMemo(() => Object.values(cartItems), [cartItems]);
  const navigation = useNavigation();

  const objProducts: Record<string, AppStore.Product> = useMemo(
    () =>
      products.reduce((acc, product) => {
        return { ...acc, [product.id]: product };
      }, {}),
    [products],
  );

  const pickedProductCount = useMemo(
    () =>
      orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0),
    [orderItems],
  );

  const pickedProductsPrice = useMemo(
    () =>
      orderItems.reduce((acc, orderItem) => {
        const { productId, quantity } = orderItem;
        return objProducts[productId]
          ? acc + productUtil.getPriceWithQuantity(objProducts[productId], quantity)
          : 0;
      }, 0),
    [objProducts, orderItems],
  );

  const handleAdd = useCallback(
    (productId: string) => {
      if (!objProducts[productId]) {
        return;
      }
      if (
        !_.isNil(objProducts[productId].stock) &&
        objProducts[productId].stock! <= (prev[productId]?.quantity || 0)
      ) {
        Toast.show({ text1: 'Vượt quá số lượng sản phẩm tồn kho', type: 'error' });
        return;
      }
      dispatch(cartActions.addProductItem(productId));
    },
    [dispatch, objProducts],
  );

  const handleSubtract = useCallback(
    (productId: string) => {
      dispatch(cartActions.subtractProductItem(productId));
    },
    [dispatch],
  );

  const handleSet = useCallback(
    (item: PickedOrderItem) => {
      dispatch(cartActions.setProductItem(item));
    },
    [dispatch],
  );

  const handlePressNext = () => {
    navigation.navigate(SCREENS.ORDER_CONFIRM);
  };

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={products}
        keyExtractor={(item, index) => item.id || index.toString()}
        extraData={{
          a: 1,
        }}
        renderItem={({ item }) => {
          return (
            <PickProduct
              product={item}
              onAdd={handleAdd}
              onSubtract={handleSubtract}
              onSet={handleSet}
              quantity={cartItems[item.id]?.quantity}
            />
          );
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
      {!!pickedProductCount && (
        <View
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          bgColor="$white"
          as={SafeAreaView}
          // @ts-ignore
          edges={['bottom']}
          py={16}
          borderTopWidth={1}
          borderColor="$coolGray400"
        >
          <View px={16}>
            <Button size="lg" onPress={handlePressNext} height={60}>
              <HStack width="$full" alignItems="center" justifyContent="center" columnGap={24}>
                <View justifyContent="center" alignItems="center">
                  <Badge
                    position="absolute"
                    right={-16}
                    top={-16}
                    height={24}
                    width={24}
                    px={0}
                    py={0}
                    bg="$red600"
                    borderRadius="$full"
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <BadgeText color="$white">
                      {pickedProductCount > 99 ? '99+' : pickedProductCount}
                    </BadgeText>
                  </Badge>

                  <ButtonIcon as={ShoppingCart} />
                </View>
                <View flex={1}>
                  <ButtonText>{pickedProductsPrice}</ButtonText>
                </View>
                <View>
                  <ButtonText>Tiếp tục</ButtonText>
                </View>
              </HStack>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
