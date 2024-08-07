import { Button, ButtonText, KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateOrderMutation } from 'src/api';
import { LoadingOverlay, ViewFooter } from 'src/components';
import { HOME_SCREENS, ORDER_STATUSES_MAP, PAYMENT_METHODS_MAP, SCREENS } from 'src/constants';
import { useMessages, useOrder } from 'src/hooks';
import { goBack } from 'src/navigations';
import { ControlPaymentAmount } from 'src/screens/order-update-payment/views/control/control-payment-amount';
import { ApiRequest, Entity, FormParams } from 'src/types';
import * as Yup from 'yup';

import { PriceSection } from './price-section/order-update-payment-price-section';
import { ControlPickPaymentMethod } from './price-section/pick-payment-method/control-pick-payment-methods';

export const OrderUpdatePaymentContent: FC<{
  detail: Entity.Order;
  updateStatusDelivered: boolean;
}> = ({ detail, updateStatusDelivered }) => {
  const { data: order, isFetching: isFetchingOrder, refetch } = useOrder(detail);
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();

  const [updateOrder] = useUpdateOrderMutation();

  const payout =
    order.payments?.reduce((result, payment) => {
      return (payment.amount || 0) + result;
    }, 0) || 0;

  const currentMissingAmount = (order.amount || 0) - payout;

  const defaultValues = useMemo(
    () => ({
      amount: currentMissingAmount || 0,
      paymentMethod: PAYMENT_METHODS_MAP.BANK,
    }),
    [currentMissingAmount],
  );

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormParams.UpdateOrderPayment>({
    defaultValues,
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number().required().nullable(),
        paymentMethod: Yup.string().oneOf(Object.values(PAYMENT_METHODS_MAP)).required(),
      }),
    ),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormParams.UpdateOrderPayment> = useCallback(
    async values => {
      try {
        const { amount, paymentMethod } = values;
        const body: ApiRequest.UpdateOrder = {};
        if (amount) {
          body.addPayment = {
            amount,
            method: paymentMethod,
          };
        }
        if (updateStatusDelivered) {
          body.status = ORDER_STATUSES_MAP.DELIVERED;
        }
        await updateOrder({
          id: order.id,
          body,
        }).unwrap();
        await refetch();
        if (!updateStatusDelivered) {
          goBack(SCREENS.HOME, { screen: HOME_SCREENS.ORDERS });
          return;
        }
        navigation.dispatch(StackActions.replace(SCREENS.INVOICE, { order }));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
          type: 'error',
        });
      }
    },
    [formatErrorMessage, navigation, order, refetch, updateOrder, updateStatusDelivered],
  );

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isFetchingOrder} />
        <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={100}>
          <ScrollView flex={1}>
            <View flex={1}>
              <PriceSection order={order} bg={'$white'} p={16} />
              <ControlPaymentAmount
                mt={24}
                control={control}
                currentMissingAmount={currentMissingAmount}
                flex={1}
                justifyContent="center"
              />
              <ControlPickPaymentMethod control={control} px={8} pb={24} />
            </View>
          </ScrollView>

          <ViewFooter px={16} py={16} bgColor="#fff">
            <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
              <ButtonText>Thanh toán</ButtonText>
            </Button>
          </ViewFooter>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
