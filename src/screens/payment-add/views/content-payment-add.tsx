import { Button, ButtonText, KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useCreatePaymentMutation } from 'src/api';
import { LoadingOverlay, ViewFooter } from 'src/components';
import {
  HOME_SCREENS,
  PAYMENT_METHODS_MAP,
  PAYMENT_TYPES_MAP,
  SCREENS,
  TIME_FORMATS,
} from 'src/constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations';
import { selectCurrentShopId } from 'src/store/shop';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

import { ControlPaymentAmount } from './control/control-payment-amount';
import { ControlPaymentAt } from './control/control-payment-at';

export const ContentPaymentAdd = () => {
  const shopId = useAppSelector(selectCurrentShopId);
  const { formatErrorMessage } = useMessages();
  const [createPaymentMutation] = useCreatePaymentMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormParams.CreatePayment>({
    defaultValues: {
      amount: 0,
      title: null,
      method: PAYMENT_METHODS_MAP.CASH,
      note: null,
      imageIds: [],
      at: moment().format(TIME_FORMATS.DATE),
      type: PAYMENT_TYPES_MAP.INCOME,
    },
    resolver: yupResolver<FormParams.CreatePayment>(
      Yup.object({
        amount: Yup.number().positive('Lượng tiền cần lớn hơn 0').required('Thông tin bắt buộc'),
        title: Yup.string().required('Thông tin bắt buộc').nullable(),
        method: Yup.string()
          .oneOf(Object.values(PAYMENT_METHODS_MAP))
          .required('Thông tin bắt buộc'),
        note: Yup.string().required('Thông tin bắt buộc').nullable(),
        at: Yup.string().required('Thông tin bắt buộc').nullable(),
        imageIds: Yup.array().of(Yup.string().required()).required('Thông tin bắt buộc'),
        type: Yup.string().oneOf(Object.values(PAYMENT_TYPES_MAP)).required('Thông tin bắt buộc'),
      }),
    ),
  });

  const onSubmit: SubmitHandler<FormParams.CreatePayment> = async values => {
    try {
      await createPaymentMutation({ ...values, shopId }).unwrap();
      goBack(SCREENS.HOME, { screen: HOME_SCREENS.PAYMENTS });
      Toast.show({
        text1: 'Tạo khoản thu thành công',
      });
    } catch (error) {
      Toast.show({ text1: formatErrorMessage(error) });
    }
  };

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isSubmitting} />
        <View px={16} mt={8} bgColor="$white" flex={1}>
          <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={100}>
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <ControlPaymentAmount control={control} mt={16} />
              <ControlPaymentAt control={control} mt={16} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <ViewFooter py={16} px={16}>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Tạo mới</ButtonText>
          </Button>
        </ViewFooter>
      </View>
    </>
  );
};
