import { ScrollView, Text, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateOrderMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { ORDER_PAYMENT_METHODS } from 'src/constants';
import { useOrder } from 'src/hooks';
import { ControlPaymentAmount } from 'src/screens/order-update-payment/views/control/control-payment-amount';
import { Entity, FormParams } from 'src/types';
import { orderUtil } from 'src/utils';
import * as Yup from 'yup';

import { PriceSection } from './price-section/order-update-payment-price-section';
import { ControlPickPaymentMethod } from './price-section/pick-payment-method/control-pick-payment-methods';

export const OrderUpdatePaymentContent: FC<{ detail: Entity.Order }> = ({ detail }) => {
  const { data: order, isFetching: isFetchingOrder } = useOrder(detail);

  const [updateOrder, { isLoading: isLoadingUpdateOrder }] = useUpdateOrderMutation();

  const defaultValues = useMemo(
    () => ({
      amount: order.amount || 0,
      paymentMethod: ORDER_PAYMENT_METHODS.CASH,
    }),
    [order.amount],
  );

  const {
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormParams.UpdateOrderPayment>({
    defaultValues,
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number().required().nullable(),
        paymentMethod: Yup.string().oneOf(Object.values(ORDER_PAYMENT_METHODS)).required(),
      }),
    ),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const amount = useMemo(() => orderUtil.getAmount(order), [order]);

  const updateOrdera = useCallback(async () => {
    // try {
    //   await updateOrder({
    //     status: ORDER_STATUSES.PROCESSING,
    //     items: Object.values(cartItems),
    //   }).unwrap();
    //   navigation.navigate(SCREENS.HOME, { screen: HOME_SCREENS.ORDERS });
    // } catch (err) {
    //   Toast.show({ text1: formatErrorMessage(err), type: 'error' });
    // }
  }, []);

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isFetchingOrder} />
        <ScrollView flex={1}>
          <PriceSection order={order} bg={'$white'} p={16} />
          <View px={16}>
            <ControlPaymentAmount control={control} amount={amount} mt={100} />

            <View mt={100}>
              <View>
                <Text>Hình thức thanh toán:</Text>
              </View>
              <ControlPickPaymentMethod control={control} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
