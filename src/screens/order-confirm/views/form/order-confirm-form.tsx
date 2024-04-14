import { Button, ButtonIcon, ButtonText, HStack, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCreateOrderMutation } from 'src/api';
import { Header } from 'src/components';
import { HOME_SCREENS, ORDER_STATUSES, SCREENS } from 'src/constants';
import { FormControlOrderAdditional } from 'src/containers/form-control/product/form-control-order-additional';
import { FormControlOrderNote } from 'src/containers/form-control/product/form-control-order-note';
import { useAppDispatch, useAppSelector, useMessages, useProducts } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { FormParams, PickedOrderItem, PickedOrderItems, ProductWithQuantity } from 'src/types';
import { createOrderFormUtil } from 'src/utils';

import { ConfirmOrderItem } from './confirm-order-item';
import { ConfirmOrderPrices } from './confirm-order-prices';

export const OrderConfirmForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [createOrder] = useCreateOrderMutation();
  const { formatErrorMessage } = useMessages();

  const { data: products } = useProducts();
  const settings = useAppSelector(s => s.app.orderSettings);
  const cartItemsObj = useAppSelector(s => s.cart.items);

  const defaultValues = useMemo(() => {
    return createOrderFormUtil.getDefaultValues({ products, pickedOrderItems: cartItemsObj });
  }, [cartItemsObj, products]);

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
    getValues,
  } = useForm<FormParams.CreateOrder>({
    defaultValues,
    // resolver: createProductFormUtil.getResolver(),
  });

  useEffect(() => {
    if (defaultValues) {
      reset();
    }
  }, [defaultValues, reset]);

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

  const handleDelete = useCallback((productId: string) => {
    setOrderItems(prev => {
      return prev.filter(e => e.productId !== productId);
    });
  }, []);

  const onLeftPress = useCallback(() => {
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

  const saveOrder = useCallback(async () => {
    try {
      await createOrder({
        status: ORDER_STATUSES.PROCESSING,
        items: orderItems.map(e => ({
          productId: e.productId,
          quantity: e.quantity,
        })),
      }).unwrap();
      dispatch(cartActions.setCartItems({}));
      navigation.navigate(SCREENS.Home, { screen: HOME_SCREENS.ORDER });
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err), type: 'error' });
    }
  }, [createOrder, dispatch, formatErrorMessage, navigation, orderItems]);

  return (
    <>
      <Header
        title="Xác nhận đơn"
        leftText="Sản phẩm"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
      />

      <View bg="$white" py={16} flex={1}>
        <View flex={1}>
          <View mt={16}></View>
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
                  onDelete={handleDelete}
                />
              );
            }}
            estimatedItemSize={20}
            ListHeaderComponent={
              <View mb={8} px={16}>
                <Button variant="outline" onPress={onLeftPress}>
                  <ButtonIcon as={Plus}></ButtonIcon>
                  <ButtonText>Thêm sản phẩm</ButtonText>
                </Button>
              </View>
            }
            ListFooterComponent={
              <View mb={100}>
                {!!settings.showCreateOrderNote && (
                  <View mt={16} px={16}>
                    <FormControlOrderNote control={control} />
                  </View>
                )}
                <View mt={16}>
                  <View px={16}>
                    <View>
                      <Text>Thêm</Text>
                    </View>
                    <View flexDirection="row">
                      <FormControlOrderAdditional />
                    </View>
                  </View>
                </View>
              </View>
            }
          ></FlashList>
        </View>
      </View>

      <View
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        bgColor="$white"
        as={SafeAreaView}
        // @ts-ignore
        edges={['bottom']}
        pt={16}
        borderTopWidth={1}
        borderColor="$coolGray200"
        px={16}
      >
        <View>
          <ConfirmOrderPrices orderItems={orderItems} />
        </View>
        <View mt={16}>
          <HStack columnGap={16} flex={1}>
            <View flex={1}>
              <Button variant="outline" onPress={saveOrder}>
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
        </View>
      </View>
    </>
  );
};
