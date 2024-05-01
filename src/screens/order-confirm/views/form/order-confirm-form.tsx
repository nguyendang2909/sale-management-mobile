import { Button, ButtonIcon, ButtonText, HStack, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCreateOrderMutation } from 'src/api';
import { Header } from 'src/components';
import { HOME_SCREENS, ORDER_STATUSES, SCREENS } from 'src/constants';
import { FormControlOrderAdditional } from 'src/containers/form-control/order/form-control-order-additional';
import { FormControlOrderNote } from 'src/containers/form-control/order/form-control-order-note';
import { useAppDispatch, useAppSelector, useMessages, useProducts } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { FormParams } from 'src/types';
import { createOrderFormUtil } from 'src/utils';

import { ConfirmOrderItem } from './confirm-order-item';
import { ConfirmOrderPrices } from './confirm-order-prices';

export const OrderConfirmForm: FC<{ values: FormParams.CreateOrder }> = ({ values }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [createOrder] = useCreateOrderMutation();
  const { formatErrorMessage } = useMessages();

  const { data: products } = useProducts();
  const settings = useAppSelector(s => s.app.orderSettings);
  const cartItemsObj = useAppSelector(s => s.cart.items);

  const pickedProducts = products.filter(product => !!cartItemsObj[product.id]);

  const defaultValues = useMemo(() => {
    return createOrderFormUtil.getDefaultValues(values);
  }, [values]);

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
    resolver: createOrderFormUtil.getResolver(),
  });

  useEffect(() => {
    if (defaultValues) {
      reset();
    }
  }, [defaultValues, reset]);

  // const handleDelete = useCallback((productId: string) => {
  //   setOrderItems(prev => {
  //     return prev.filter(e => e.productId !== productId);
  //   });
  // }, []);

  const onLeftPress = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_CREATE, {
      values: getValues(),
    });
  }, [getValues, navigation]);

  const saveOrder = useCallback(async () => {
    try {
      await createOrder({
        status: ORDER_STATUSES.PROCESSING,
        items: Object.values(cartItemsObj),
      }).unwrap();
      navigation.navigate(SCREENS.Home, { screen: HOME_SCREENS.ORDER });
      dispatch(cartActions.setCartItems({}));
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err), type: 'error' });
    }
  }, [cartItemsObj, createOrder, dispatch, formatErrorMessage, navigation]);

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
            data={pickedProducts}
            keyExtractor={(item, index) => item.id || index.toString()}
            // extraData={{
            //   a: 1,
            // }}
            renderItem={({ item }) => {
              return (
                <ConfirmOrderItem
                  product={item}
                  // onAdd={handleAdd}
                  // onSubtract={handleSubtract}
                  // onSet={handleSet}
                  // onDelete={handleDelete}
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
                {/* {!!settings.showCreateOrderCustomer && (
                  <View mt={16} px={16}>
                    <FormControlOrderCustomer control={control} />
                  </View>
                )} */}
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
        borderColor="$backgroundLight200"
        px={16}
      >
        <View>
          <ConfirmOrderPrices pickedProducts={pickedProducts} cartItems={cartItemsObj} />
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
