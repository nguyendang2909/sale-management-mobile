import {
  Button,
  ButtonText,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCreateProductMutation } from 'src/api';
import { LoadingLayout } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { FormControlProductAdditional } from 'src/containers/form-control/product/form-control-product-additional';
import { ProductCategoriesControl } from 'src/containers/form-control/product/form-control-product-categories';
import { ProductInStockControl } from 'src/containers/form-control/product/form-control-product-in-stock';
import { ProductCapitalPriceControl } from 'src/containers/form-control/product/product-capital-price.control';
import { ProductImagesControl } from 'src/containers/form-control/product/product-images.control';
import { ProductPriceControl } from 'src/containers/form-control/product/product-price.control';
import { ProductPromotionalPriceControl } from 'src/containers/form-control/product/product-promotional-price.control';
import { ProductSkuControl } from 'src/containers/form-control/product/product-sku.control';
import { ProductStockControl } from 'src/containers/form-control/product/product-stock.control';
import { ProductTitleControl } from 'src/containers/form-control/product/product-title.control';
import { ProductTrackingStockControl } from 'src/containers/form-control/product/product-tracking-stock.control';
import { ProductUnitControl } from 'src/containers/form-control/product/product-unit.control';
import { useMessages, useProductSettings } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { ApiRequest, FormParams } from 'src/types';
import { createProductFormUtil } from 'src/utils';

export const CreateProductForm: FC = () => {
  useCategories();

  const { data: settings } = useProductSettings();
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();
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
    defaultValues: createProductFormUtil.getDefaultValues(),
    resolver: createProductFormUtil.getResolver(),
  });

  console.log(1111, errors);

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const { createMore, images, categories, skus, ...restValues } = values;
      const payload: ApiRequest.CreateProduct = {
        ...restValues,
        skus: skus.map(e => ({ ...e, price: e.price || 0 })),
      };
      if (images.length) {
        payload.imageIds = images.map(e => e.id);
      }
      if (categories.length) {
        payload.categoryIds = categories.map(e => e.id);
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

  const isInStock = watch('isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);

  const attributesValue = watch('attributes');

  const attributeProperties = useMemo(
    () =>
      attributesValue.reduce<{ skuTotal: number }>(
        (acc, attr) => {
          return {
            skuTotal: acc.skuTotal + attr.specifications.length,
          };
        },
        { skuTotal: 0 },
      ),
    [attributesValue],
  );

  const hasOnlyOneSku = useMemo(
    () => attributeProperties.skuTotal === 1,
    [attributeProperties.skuTotal],
  );

  return (
    <>
      <View flex={1}>
        <LoadingLayout isLoading={isSubmitting} />
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <View px={16} py={8} bgColor="$white" mb={16}>
                  <ProductTitleControl control={control} />
                  <ProductImagesControl mt={16} control={control} />
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
                  <ProductCategoriesControl mt={16} control={control} />
                </View>
                <View px={16} py={16} bgColor="$white">
                  <View>
                    <Text fontWeight="$bold">Quản lý tồn kho</Text>
                  </View>
                  <ProductSkuControl mt={16} control={control} />
                  {!isTrackingStock && <ProductInStockControl mt={16} control={control} />}
                  <ProductTrackingStockControl mt={16} control={control} />
                  {isTrackingStock && hasOnlyOneSku && (
                    <ProductStockControl mt={16} control={control} />
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
