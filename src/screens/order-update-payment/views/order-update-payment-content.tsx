import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useLazyFetchOrderQuery, useUpdateOrderMutation } from 'src/api';
import { LoadingOverlay, ViewFooter } from 'src/components';
import { ORDER_PAYMENT_METHODS, ORDER_STATUSES } from 'src/constants';
import { useMessages, useOrder } from 'src/hooks';
import { ControlPaymentAmount } from 'src/screens/order-update-payment/views/control/control-payment-amount';
import { ApiRequest, Entity, FormParams } from 'src/types';
import { orderUtil } from 'src/utils';
import * as Yup from 'yup';

import { PriceSection } from './price-section/order-update-payment-price-section';
import { ControlPickPaymentMethod } from './price-section/pick-payment-method/control-pick-payment-methods';

export const OrderUpdatePaymentContent: FC<{ detail: Entity.Order }> = ({ detail }) => {
  const { data: order, isFetching: isFetchingOrder } = useOrder(detail);
  const { formatErrorMessage } = useMessages();

  const [updateOrder, { isLoading: isLoadingUpdateOrder }] = useUpdateOrderMutation();
  const [fetchOrder] = useLazyFetchOrderQuery();

  const defaultValues = useMemo(
    () => ({
      amount: order.amount || 0,
      paymentMethod: ORDER_PAYMENT_METHODS.BANK,
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

  const onSubmit: SubmitHandler<FormParams.UpdateOrderPayment> = async values => {
    try {
      const { amount, paymentMethod } = values;
      const body: ApiRequest.UpdateOrder = {
        status: ORDER_STATUSES.DELIVERED,
      };
      if (amount) {
        body.addPayment = {
          amount,
          method: paymentMethod,
        };
      }
      await updateOrder({
        id: order.id,
        body,
      }).unwrap();
      fetchOrder(order.id);
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
        type: 'error',
      });
    }
  };

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isFetchingOrder} />
        <View flex={1}>
          <PriceSection order={order} bg={'$white'} p={16} />
          <ControlPaymentAmount control={control} order={order} flex={1} justifyContent="center" />
          <ControlPickPaymentMethod control={control} px={8} pb={24} />
        </View>

        <ViewFooter px={16} py={16} bgColor="#fff">
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Thanh toán</ButtonText>
          </Button>
        </ViewFooter>
      </View>
    </>
  );
};
