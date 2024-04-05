import {
  Button,
  ButtonText,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCreateProductMutation } from 'src/api';
import { LoadingLayout } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { FormControlProductAdditional } from 'src/containers/form-control/product/form-control-product-additonal';
import { FormControlProductCapitalPrice } from 'src/containers/form-control/product/form-control-product-capital-price';
import { FormControlProductCategories } from 'src/containers/form-control/product/form-control-product-categories';
import { FormControlProductImages } from 'src/containers/form-control/product/form-control-product-images';
import { FormControlProductInStock } from 'src/containers/form-control/product/form-control-product-in-stock';
import { FormControlProductInventory } from 'src/containers/form-control/product/form-control-product-inventory';
import { FormControlProductPrice } from 'src/containers/form-control/product/form-control-product-price';
import { FormControlProductPromotionalPrice } from 'src/containers/form-control/product/form-control-product-promotional-price';
import { FormControlProductSku } from 'src/containers/form-control/product/form-control-product-sku';
import { FormControlProductTitle } from 'src/containers/form-control/product/form-control-product-title';
import { FormControlProductTrackingStock } from 'src/containers/form-control/product/form-control-product-tracking-stock';
import { FormControlProductUnit } from 'src/containers/form-control/product/form-control-product-unit';
import { useMessages, useSettings } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { flexGrow } from 'src/styles';
import { ApiRequest, FormParams } from 'src/types';
import { createProductFormUtil } from 'src/utils';

export const CreateProductForm: FC = () => {
  useCategories();

  const { data: settings } = useSettings();
  const navigation = useNavigation();
  const { formatMessage, formatErrorMessage } = useMessages();
  const [createProduct] = useCreateProductMutation();

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
    getValues,
  } = useForm<FormParams.CreateProduct>({
    defaultValues: createProductFormUtil.getDefaulValues(),
    resolver: createProductFormUtil.getResolver(),
  });

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const {
        createMore,
        images,
        capitalPrice,
        promotionalPrice,
        categories,
        price,
        wholesalePrice,
        minWholesalePriceQuantity,
        ...restValues
      } = values;
      const payload: ApiRequest.CreateProduct = { ...restValues, price: price! };
      if (images.length) {
        payload.imageIds = images.map(e => e.id);
      }
      if (capitalPrice) {
        payload.capitalPrice = capitalPrice;
      }
      if (promotionalPrice) {
        payload.promotionalPrice = promotionalPrice;
      }
      if (wholesalePrice) {
        payload.wholesalePrice = wholesalePrice;
      }
      if (categories.length) {
        payload.categoryIds = categories.map(e => e.id);
      }
      if (minWholesalePriceQuantity) {
        payload.minWholesalePriceQuantity = minWholesalePriceQuantity;
      }
      await createProduct(payload).unwrap();
      if (createMore) {
        reset();
        return;
      }
      navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: HOME_SCREENS.PRODUCT }));
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
    }
  };

  const handleCreateProduct = async () => {
    setValue('createMore', false);
    handleSubmit(onSubmit);
  };

  const handleCreateMoreProduct = () => {
    setValue('createMore', true);
    handleSubmit(onSubmit);
  };

  const isTrackingStock = watch('isTrackingStock');

  return (
    <>
      <View flex={1}>
        <LoadingLayout isLoading={isSubmitting} />
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <ScrollView style={flexGrow}>
                <View px={16} py={8} bgColor="$white" mb={16}>
                  <View>
                    <FormControlProductTitle control={control} />
                  </View>
                  {(!!settings.showCreateProductImage || !!getValues('images').length) && (
                    <View mt={16}>
                      <FormControlProductImages control={control} />
                    </View>
                  )}
                  <View mt={16}>
                    <View flexDirection="row" columnGap={16}>
                      <View flex={1}>
                        <FormControlProductPrice control={control} />
                      </View>
                      <View flex={1}>
                        <FormControlProductCapitalPrice control={control} />
                      </View>
                    </View>
                  </View>
                  {(!!settings.showCreateProductPromotionPrice ||
                    !!getValues('promotionalPrice')) && (
                    <View mt={16}>
                      <FormControlProductPromotionalPrice control={control} />
                    </View>
                  )}
                  {(!!settings.showCreateProductUnit || !!getValues('unit')) && (
                    <View mt={16}>
                      <FormControlProductUnit control={control} />
                    </View>
                  )}
                  <View mt={16}>
                    <FormControlProductCategories control={control} />
                  </View>
                </View>
                <View px={16} py={16} bgColor="$white">
                  <View>
                    <Text fontWeight="$bold">Quản lý tồn kho</Text>
                  </View>
                  <View mt={16}>
                    <FormControlProductSku control={control} />
                  </View>
                  {!isTrackingStock && (
                    <View mt={16}>
                      <FormControlProductInStock control={control} />
                    </View>
                  )}
                  <View mt={16}>
                    <FormControlProductTrackingStock control={control} />
                  </View>
                  {!!isTrackingStock && (
                    <View mt={16}>
                      <FormControlProductInventory control={control} />
                    </View>
                  )}
                </View>
                <View mt={16}>
                  <View px={16}>
                    <View>
                      <Text>Thêm</Text>
                    </View>
                    <View flexDirection="row">
                      <FormControlProductAdditional />
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View px={16} py={16}>
                <View flexDirection="row" columnGap={16}>
                  <View flex={1}>
                    <Button variant="outline" onPress={handleCreateMoreProduct}>
                      <ButtonText>Tạo thêm</ButtonText>
                    </Button>
                  </View>
                  <View flex={1}>
                    <Button onPress={handleSubmit(onSubmit)}>
                      <ButtonText>Hoàn tất</ButtonText>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </View>
    </>
  );
};
