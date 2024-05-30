import { Button, ButtonIcon, ButtonText, HStack, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import _ from 'lodash';
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
import { getState } from 'src/store';
import { cartActions } from 'src/store/cart';
import { orderActions } from 'src/store/order';
import { FormParams } from 'src/types';
import { createOrderFormUtil, skuUtil } from 'src/utils';

import { ConfirmOrderItem } from './confirm-order-item';
import { ConfirmOrderPrices } from './confirm-order-prices';

export const OrderConfirmForm: FC<{ values: FormParams.CreateOrder }> = ({ values }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const shopId = useAppSelector(s => s.app.shop.id);
  const [createOrder] = useCreateOrderMutation();
  const { formatErrorMessage } = useMessages();

  const { data: products } = useProducts();
  const settings = useAppSelector(s => s.app.orderSettings);
  const skuItemsObj = useAppSelector(s => {
    return Object.values(s.cart.items).reduce((acc, item) => {
      return { ...acc, [item.skuId]: item.skuId };
    }, {});
  }, _.isEqual);
  const pickedSkus = useMemo(
    () => skuUtil.getPickedSkusFromProducts(products, skuItemsObj),
    [skuItemsObj, products],
  );

  const defaultValues = useMemo(() => {
    return createOrderFormUtil.getDefaultValues(values);
  }, [values]);

  const { reset, handleSubmit, control, getValues } = useForm<FormParams.CreateOrder>({
    defaultValues,
    resolver: createOrderFormUtil.getResolver(),
  });

  useEffect(() => {
    if (defaultValues) {
      reset();
    }
  }, [defaultValues, reset]);

  const onLeftPress = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_CREATE, {
      values: getValues(),
    });
  }, [getValues, navigation]);

  const saveOrder = useCallback(async () => {
    try {
      const cartItems = getState().cart.items;
      const { data: order } = await createOrder({
        shopId,
        body: {
          status: ORDER_STATUSES.PROCESSING,
          items: Object.values(cartItems),
        },
      }).unwrap();
      navigation.navigate(SCREENS.HOME, { screen: HOME_SCREENS.ORDERS });
      dispatch(orderActions.addOrder(order));
      dispatch(cartActions.setCartItems({}));
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err), type: 'error' });
    }
  }, [createOrder, dispatch, formatErrorMessage, navigation, shopId]);

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
            data={pickedSkus}
            keyExtractor={(item, index) => item.id || index.toString()}
            // extraData={{
            //   a: 1,
            // }}
            renderItem={({ item }) => {
              console.log(4444);
              return (
                <ConfirmOrderItem
                  sku={item}
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
                {!!settings.showNote && (
                  <View mt={16} px={16}>
                    <FormControlOrderNote control={control} />
                  </View>
                )}
                {/* {!!settings.showCustomer && (
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
          <ConfirmOrderPrices pickedSkus={pickedSkus} />
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
