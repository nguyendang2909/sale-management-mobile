import {
  Button,
  ButtonText,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useCreateProductMutation, useLazyFetchProductQuery } from 'src/api';
import { ViewFooter } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useAppSelector, useDisclose, useMessages } from 'src/hooks';
import { ApiRequest, FormParams } from 'src/types';
import { createProductFormUtil } from 'src/utils';

import { SectionProductClassification } from './classification/section-product-classification';
import { ControlProductCategories } from './form/control-product-categories';
import { FormControlProductAdditional } from './form/form-control-product-additional';
import { ProductInStockControl } from './form/form-control-product-in-stock';
import { ProductCapitalPriceControl } from './form/product-capital-price.control';
import { ProductImagesControl } from './form/product-images.control';
import { ProductPriceControl } from './form/product-price.control';
import { ProductPromotionalPriceControl } from './form/product-promotional-price.control';
import { ProductSkuControl } from './form/product-sku.control';
import { ProductStockControl } from './form/product-stock.control';
import { ProductTitleControl } from './form/product-title.control';
import { ProductTrackingStockControl } from './form/product-tracking-stock.control';
import { ProductUnitControl } from './form/product-unit.control';

export const ContentProductCreate: FC = () => {
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();
  const [createProduct] = useCreateProductMutation();
  const [fetchProduct] = useLazyFetchProductQuery();
  const createProductData = useAppSelector(s => s.cache.forms.createProduct);

  const {
    isOpen: shouldCreateMore,
    onOpen: setCreateMore,
    onClose: cancelCreateMore,
  } = useDisclose();

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
    getValues,
  } = useForm<FormParams.CreateProduct>({
    defaultValues: createProductFormUtil.getDefaultValues(createProductData),
    resolver: createProductFormUtil.getResolver(),
  });

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const { images, skus, ...restValues } = values;
      const payload: ApiRequest.CreateProduct = {
        ...restValues,
        skus: skus.map(e => ({ ...e, price: e.price || 0 })),
      };
      if (images.length) {
        payload.imageIds = images.map(e => e.id);
      }
      const data = await createProduct(payload).unwrap();
      fetchProduct(data.data.id);
      if (shouldCreateMore) {
        reset(createProductFormUtil.getDefaultValues());
        return;
      }
      navigation.dispatch(StackActions.replace(SCREENS.HOME, { screen: HOME_SCREENS.PRODUCTS }));
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
    }
  };

  const handleCreateProduct = async () => {
    cancelCreateMore();
    await handleSubmit(onSubmit)();
  };

  const handleCreateMoreProduct = async () => {
    setCreateMore();
    await handleSubmit(onSubmit)();
  };

  const isInStock = watch('skus.0.isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);
  const attributesValue = watch('attributes');
  const hasDefaultSku = useMemo(() => attributesValue.length === 0, [attributesValue]);

  const setSkus = useCallback(
    (skusValue: FormParams.CreateProductSku[]) => {
      setValue('skus', skusValue);
    },
    [setValue],
  );

  const getSkus = useCallback(() => {
    return getValues('skus');
  }, [getValues]);

  const setSku = useCallback(
    (index: number, skuValue: FormParams.CreateProductSku) => {
      const skusValue = getSkus();
      skusValue[index] = skuValue;
      setValue('skus', skusValue);
    },
    [getSkus, setValue],
  );

  const specifications = attributesValue.reduce<FormParams.CreateProductSpecification[]>(
    (acc, attr) => {
      const specifications = attr.specifications;
      return acc.concat(acc.concat(specifications));
    },
    [],
  );

  const specificationsMap = _.keyBy(specifications, 'id');

  return (
    <>
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
                    <ProductTitleControl control={control} />
                    <ProductImagesControl mt={16} control={control} />
                    {hasDefaultSku && (
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
                    <ControlProductCategories mt={16} control={control} />
                  </View>
                  <View px={16} py={16} bgColor="$white">
                    <View>
                      <Text fontWeight="$bold">Quản lý tồn kho</Text>
                    </View>
                    {hasDefaultSku && <ProductSkuControl mt={16} control={control} />}
                    {!isTrackingStock && hasDefaultSku && (
                      <ProductInStockControl mt={16} control={control} />
                    )}
                    {hasDefaultSku && <ProductTrackingStockControl mt={16} control={control} />}
                    {isTrackingStock && hasDefaultSku && (
                      <ProductStockControl mt={16} control={control} />
                    )}
                  </View>
                  <SectionProductClassification
                    mt={16}
                    control={control}
                    setSkus={setSkus}
                    setSku={setSku}
                    getSkus={getSkus}
                    hasDefaultSku={hasDefaultSku}
                    specificationsMap={specificationsMap}
                    getProduct={getValues}
                  />
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
              </KeyboardAvoidingView>

              <ViewFooter px={16} py={16}>
                <View flexDirection="row" columnGap={16}>
                  <View flex={1}>
                    <Button variant="outline" onPress={handleCreateMoreProduct}>
                      <ButtonText>Tạo thêm</ButtonText>
                    </Button>
                  </View>
                  <View flex={1}>
                    <Button onPress={handleCreateProduct}>
                      <ButtonText>Hoàn tất</ButtonText>
                    </Button>
                  </View>
                </View>
              </ViewFooter>
            </View>
          </View>
        </View>
        {/* {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />} */}
      </View>
    </>
  );
};
