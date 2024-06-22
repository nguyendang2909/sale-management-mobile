import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateShopMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { SCREENS } from 'src/constants';
import { useCurrentShop, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations';
import { FormParams, ViewProps } from 'src/types';
import { updateShopFormUtil } from 'src/utils/shop/update-shop.form.util';

import { FooterShop } from '../footer-shop';
import { ControlShopAddress } from './control/control-shop-address';
import { ControlShopDescription } from './control/control-shop-description';
import { ControlShopPhone } from './control/control-shop-phone';
import { ControlShopTitle } from './control/control-shop-title';
import { ControlWorkingTime } from './control/control-working-time';

export const ContentShop: FC<ViewProps> = ({ ...viewProps }) => {
  const {
    data: shop,
    refetch: refetchCurrentShop,
    isLoading: isLoadingCurrentShop,
  } = useCurrentShop();
  const [updateShop] = useUpdateShopMutation();
  const { formatErrorMessage } = useMessages();
  const defaultValues = useMemo(() => updateShopFormUtil.getDefaultValues(shop), [shop]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    reset,
    setValue,
    watch,
  } = useForm<FormParams.UpdateShop>({
    defaultValues,
    resolver: updateShopFormUtil.getResolver(),
  });

  const submit = async (values: FormParams.UpdateShop) => {
    try {
      const body = updateShopFormUtil.getRequestBody(values);
      await updateShop({ shopId: shop.id, body }).unwrap();
      goBack(SCREENS.SETTINGS);
      refetchCurrentShop();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  };

  useEffect(() => {
    if (!_.isEqual(defaultValues, getValues())) {
      reset(defaultValues);
    }
  }, [defaultValues, getValues, reset]);

  const isLoading = isLoadingCurrentShop || isSubmitting;

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <View {...viewProps} flex={1}>
        <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
          <ScrollView
            flex={1}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View px={16} mt={8} py={8} bgColor="$white">
              <ControlShopTitle control={control} mt={8} />
              <ControlShopPhone control={control} mt={16} />
              <ControlShopAddress control={control} mt={16} />
              <ControlShopDescription control={control} mt={16} />
              <ControlWorkingTime control={control} setValue={setValue} watch={watch} />
              <View mt={16}></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <FooterShop onUpdate={handleSubmit(submit)} />
      </View>
    </>
  );
};
