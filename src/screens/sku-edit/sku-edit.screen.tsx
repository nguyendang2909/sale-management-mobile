import {
  Button,
  ButtonText,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DialogConfirmExit, FormControlInput, Header, ViewFooter } from 'src/components';
import { SCREENS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { goBack } from 'src/navigations';
import { AppStackScreenProps } from 'src/navigators/main.stack';
import { editSkuScreenService } from 'src/services/screens/edit-sku.screen.service';
import { FormParams } from 'src/types';
import { editSkuFormUtil } from 'src/utils/edit-sku-form.util';

import { ControlSkuCapitalPrice } from './views/control/control-sku-capital-price';
import { ControlSkuCode } from './views/control/control-sku-code';
import { ControlSkuInStock } from './views/control/control-sku-in-stock';
import { ControlSkuPrice } from './views/control/control-sku-price';
import { ControlSkuPromotionalPrice } from './views/control/control-sku-promotional-price';
import { ControlSkuStock } from './views/control/control-sku-stock';
import { ControlSkuTrackingStock } from './views/control/control-sku-tracking-stock';

export const SkuEditScreen: FC<AppStackScreenProps<'SKU_EDIT'>> = ({
  route: {
    params: { sku, product },
  },
}) => {
  const {
    isOpen: isOpenConfirmExit,
    onOpen: onOpenConfirmExit,
    onClose: onCloseConfirmExit,
  } = useDisclose();

  const onLeftPress = () => {
    if (isDirty) {
      onOpenConfirmExit();
      return;
    }
    goBack(SCREENS.PRODUCT_CREATE);
  };

  const {
    formState: { isDirty },
    control,
    watch,
    handleSubmit,
  } = useForm<FormParams.EditSku>({
    defaultValues: editSkuFormUtil.getDefaultValues(sku),
    resolver: editSkuFormUtil.getResolver(),
  });

  const isInStock = watch('isInStock');

  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);

  const handleConfirmExit = useCallback(() => {
    goBack(SCREENS.PRODUCT_CREATE);
  }, []);

  const onSubmit: SubmitHandler<FormParams.EditSku> = useCallback(
    values => {
      if (editSkuScreenService.setSku) {
        editSkuScreenService.setSku({
          ...sku,
          ...values,
        });
      }
      editSkuScreenService.appendSetSku(null);
      goBack(SCREENS.PRODUCT_CREATE);
    },
    [sku],
  );

  useEffect(() => {
    if (!editSkuScreenService.setSku) {
      goBack(SCREENS.PRODUCT_CREATE);
    }
  }, []);

  return (
    <>
      <Header title="Chi tiết phân loại" leftIcon={ChevronLeft} onLeftPress={onLeftPress} />
      <View></View>

      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <KeyboardAvoidingView
                flex={1}
                behavior="padding"
                enabled
                keyboardVerticalOffset={120}
              >
                <ScrollView
                  flex={1}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <View px={16} py={8} bgColor="$white" mb={16}>
                    {product.title && (
                      <FormControlInput
                        mb={16}
                        isRequired
                        label="Tên sản phẩm"
                        value={product.title}
                        editable={false}
                        placeholder="Ví dụ: Tương ớt Chinsu"
                      />
                    )}
                    <View>
                      <View flexDirection="row" columnGap={16}>
                        <ControlSkuPrice flex={1} control={control} />
                        <ControlSkuCapitalPrice flex={1} control={control} />
                      </View>
                    </View>
                    <ControlSkuPromotionalPrice mt={16} control={control} />
                  </View>
                  <View px={16} py={16} bgColor="$white">
                    <View>
                      <Text fontWeight="$bold">Quản lý tồn kho</Text>
                    </View>
                    <ControlSkuCode mt={16} control={control} />
                    {!isTrackingStock && <ControlSkuInStock mt={16} control={control} />}
                    <ControlSkuTrackingStock mt={16} control={control} />

                    {isTrackingStock && <ControlSkuStock mt={16} control={control} />}
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>

              <ViewFooter px={16} py={16}>
                <View flexDirection="row" columnGap={16}>
                  <View flex={1}>
                    <Button onPress={handleSubmit(onSubmit)}>
                      <ButtonText>Xác nhận</ButtonText>
                    </Button>
                  </View>
                </View>
              </ViewFooter>
            </View>
          </View>
        </View>
        {/* {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />} */}
      </View>
      <DialogConfirmExit
        isOpen={isOpenConfirmExit}
        onClose={onCloseConfirmExit}
        onConfirm={handleConfirmExit}
      />
    </>
  );
};
