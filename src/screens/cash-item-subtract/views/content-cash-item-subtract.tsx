import { Button, ButtonText, KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useCreateCashItemMutation } from 'src/api';
import { LoadingOverlay, ViewFooter } from 'src/components';
import {
  CASH_ITEM_SOURCES,
  CASH_ITEM_TYPES,
  HOME_SCREENS,
  SCREENS,
  TIME_FORMATS,
} from 'src/constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations';
import { selectCurrentShopId } from 'src/store/shop';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

import { ControlCashItemAmount } from './control/control-cash-item-amount';
import { ControlCashItemAt } from './control/control-cash-item-at';

export const ContentCashItemSubtract = () => {
  const shopId = useAppSelector(selectCurrentShopId);
  const { formatErrorMessage } = useMessages();
  const [createCashItemMutation] = useCreateCashItemMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormParams.CreateCashItem>({
    defaultValues: {
      amount: 0,
      title: null,
      source: CASH_ITEM_SOURCES.CASH,
      note: null,
      imageIds: [],
      at: moment().format(TIME_FORMATS.DATE),
      type: CASH_ITEM_TYPES.EXPENSE,
    },
    resolver: yupResolver<FormParams.CreateCashItem>(
      Yup.object({
        amount: Yup.number().positive('Lượng tiền cần lớn hơn 0').required('Thông tin bắt buộc'),
        title: Yup.string().required('Thông tin bắt buộc').nullable(),
        source: Yup.string().oneOf(Object.values(CASH_ITEM_SOURCES)).required('Thông tin bắt buộc'),
        note: Yup.string().required('Thông tin bắt buộc').nullable(),
        at: Yup.string().required('Thông tin bắt buộc').nullable(),
        imageIds: Yup.array().of(Yup.string().required()).required('Thông tin bắt buộc'),
        type: Yup.string().oneOf(Object.values(CASH_ITEM_TYPES)).required('Thông tin bắt buộc'),
      }),
    ),
  });

  const onSubmit: SubmitHandler<FormParams.CreateCashItem> = async values => {
    try {
      await createCashItemMutation({ shopId, body: values }).unwrap();
      goBack(SCREENS.HOME, { screen: HOME_SCREENS.CASH_ITEMS });
      Toast.show({
        text1: 'Tạo khoản chi thành công',
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
              <ControlCashItemAmount control={control} mt={16} />
              <ControlCashItemAt control={control} mt={16} />
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
