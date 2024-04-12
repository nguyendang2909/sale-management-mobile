import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { useAppDispatch, useAppSelector, useProducts } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { PickedOrderItem, PickedOrderItems, ProductWithQuantity } from 'src/types';

import { ConfirmOrderItem } from './confirm-order-item';

export const OrderConfirmForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { data: products } = useProducts();
  const cartItemsObj = useAppSelector(s => s.cart.items);

  const [orderItems, setOrderItems] = useState<ProductWithQuantity[]>(
    products
      .filter(product => !!cartItemsObj[product.id])
      .map(e => {
        return { ...e, ...cartItemsObj[e.id] };
      }),
  );

  const handleAdd = useCallback((productId: string) => {
    setOrderItems(prev => {
      return prev.map(e => {
        return e.productId === productId ? { ...e, quantity: e.quantity + 1 } : e;
      });
    });
  }, []);

  const handleSubtract = useCallback((productId: string) => {
    setOrderItems(prev => {
      return prev.reduce<ProductWithQuantity[]>((result, orderItem) => {
        if (orderItem.productId !== productId) {
          return result.concat(orderItem);
        }
        if (orderItem.quantity === 1) {
          return result;
        }
        return result.concat({ ...orderItem, quantity: orderItem.quantity - 1 });
      }, []);
    });
  }, []);

  const handleSet = useCallback((item: PickedOrderItem) => {
    setOrderItems(prev => {
      return prev.map(e => {
        if (e.productId === item.productId) {
          return { ...e, quantity: item.quantity };
        }
        return e;
      });
    });
  }, []);

  const onLeftPress = useCallback(() => {
    console.log(
      1111,
      orderItems.reduce<PickedOrderItems>((result, orderItem) => {
        return {
          ...result,
          [orderItem.productId]: {
            quantity: orderItem.quantity,
            productId: orderItem.productId,
          },
        };
      }, {}),
    );
    dispatch(
      cartActions.setCartItems(
        orderItems.reduce<PickedOrderItems>((result, orderItem) => {
          return {
            ...result,
            [orderItem.productId]: {
              quantity: orderItem.quantity,
              productId: orderItem.productId,
            },
          };
        }, {}),
      ),
    );
    navigation.navigate(SCREENS.CREATE_ORDER);
  }, [dispatch, navigation, orderItems]);

  return (
    <>
      <Header
        title="Xác nhận đơn"
        leftText="Sản phẩm"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
      />
      <View mt={8}></View>
      <View px={12} bg="$white" py={16} flex={1}>
        <View flex={1}>
          <Button variant="outline">
            <ButtonIcon as={Plus}></ButtonIcon>
            <ButtonText>Thêm sản phẩm</ButtonText>
          </Button>

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
                  orderItem={item}
                  onAdd={handleAdd}
                  onSubtract={handleSubtract}
                  onSet={handleSet}
                />
              );
            }}
            estimatedItemSize={100}
            ListFooterComponent={<View height={100}></View>}
          ></FlashList>
        </View>
      </View>

      {/* <View
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
        px={16}
      >
        <HStack columnGap={16} flex={1}>
          <View flex={1}>
            <Button variant="outline">
              <ButtonIcon as={Plus}></ButtonIcon>
              <ButtonText>Lưu đơn</ButtonText>
            </Button>
          </View>

          <View flex={1}>
            <Button variant="solid">
              <ButtonIcon as={Plus}></ButtonIcon>
              <ButtonText>Thanh toán</ButtonText>
            </Button>
          </View>
        </HStack>
      </View> */}
    </>
  );
};
