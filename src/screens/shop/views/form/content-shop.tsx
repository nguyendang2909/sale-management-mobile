import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateShopMutation } from 'src/api';
import { useCurrentShop, useMessages } from 'src/hooks';
import { FormParams, ViewProps } from 'src/types';
import { updateShopFormUtil } from 'src/utils/shop/update-shop.form.util';

import { FooterShop } from '../footer-shop';
import { ControlShopPhone } from './control/control-shop-phone';
import { ControlShopTitle } from './control/control-shop-title';

export const ContentShop: FC<ViewProps> = ({ ...viewProps }) => {
  const { data: shop } = useCurrentShop();
  const [updateShop] = useUpdateShopMutation();
  const { formatErrorMessage } = useMessages();
  const defaultValues = updateShopFormUtil.getDefaultValues(shop);

  const { control, handleSubmit } = useForm<FormParams.UpdateShop>({
    defaultValues,
    resolver: updateShopFormUtil.getResolver(),
  });

  const submit = async (values: FormParams.UpdateShop) => {
    try {
      const body = updateShopFormUtil.getRequestBody(values);
      await updateShop({ shopId: shop.id, body }).unwrap();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
      });
    }
  };

  return (
    <View {...viewProps} flex={1}>
      <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View px={16} mt={8} py={8} bgColor="$white" mb={16}>
            <ControlShopTitle control={control} />
            <ControlShopPhone control={control} />
            {/* <ProductImagesControl mt={16} control={control} />
            {hasOnlyOneSku && (
              <>
                <View mt={16}>
                  <View flexDirection="row" columnGap={16}>
                    <ProductPriceControl flex={1} control={control} />
                    <ProductCapitalPriceControl flex={1} control={control} />
                  </View>
                </View>
                <ProductPromotionalPriceControl mt={16} control={control} />
              </>
            )}
            <ProductUnitControl mt={16} control={control} />
            <ProductCategoriesControl mt={16} control={control} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FooterShop onUpdate={handleSubmit(submit)} />
    </View>
  );
};
