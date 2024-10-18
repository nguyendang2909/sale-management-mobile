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
import { editVariantScreenService } from 'src/services/screens/edit-variant.screen.service';
import { FormParams } from 'src/types';
import { editVariantFormUtil } from 'src/utils/edit-variant-form.util';

import { ControlVariantCapitalPrice } from './views/control/control-variant-capital-price';
import { ControlVariantCode } from './views/control/control-variant-code';
import { ControlVariantInStock } from './views/control/control-variant-in-stock';
import { ControlVariantIsEnabled } from './views/control/control-variant-is-enabled';
import { ControlVariantPrice } from './views/control/control-variant-price';
import { ControlVariantPromotionalPrice } from './views/control/control-variant-promotional-price';
import { ControlVariantStock } from './views/control/control-variant-stock';
import { ControlVariantTrackingStock } from './views/control/control-variant-tracking-stock';

export const ProductVariantEditScreen: FC<AppStackScreenProps<'PRODUCT_VARIANT_EDIT'>> = ({
  route: {
    params: { variant, product },
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
    formState: { isDirty, errors },
    control,
    watch,
    handleSubmit,
  } = useForm<FormParams.EditVariant>({
    defaultValues: editVariantFormUtil.getDefaultValues(variant),
    resolver: editVariantFormUtil.getResolver(),
  });

  const isInStock = watch('isInStock');

  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);

  const handleConfirmExit = useCallback(() => {
    goBack(SCREENS.PRODUCT_CREATE);
  }, []);

  const onSubmit: SubmitHandler<FormParams.EditVariant> = useCallback(
    values => {
      if (editVariantScreenService.setVariant) {
        editVariantScreenService.setVariant({
          ...variant,
          ...values,
        });
      }
      editVariantScreenService.appendSetVariant(null);
      goBack(SCREENS.PRODUCT_CREATE);
    },
    [variant],
  );

  useEffect(() => {
    if (!editVariantScreenService.setVariant) {
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
                        <ControlVariantPrice flex={1} control={control} />
                        <ControlVariantCapitalPrice flex={1} control={control} />
                      </View>
                    </View>
                    <ControlVariantPromotionalPrice mt={16} control={control} />
                  </View>
                  <View px={16} py={16} bgColor="$white" mb={16}>
                    <View>
                      <Text fontWeight="$bold">Quản lý tồn kho</Text>
                    </View>
                    <ControlVariantCode mt={16} control={control} />
                    {!isTrackingStock && <ControlVariantInStock mt={16} control={control} />}
                    <ControlVariantTrackingStock mt={16} control={control} />
                    {isTrackingStock && <ControlVariantStock mt={16} control={control} />}
                  </View>

                  <View px={16} py={16} bgColor="$white" mb={16}>
                    <View>
                      <Text fontWeight="$bold">Hiển thị sản phẩm</Text>
                    </View>
                    <ControlVariantIsEnabled mt={16} control={control} />
                    {isTrackingStock && <ControlVariantStock mt={16} control={control} />}
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
