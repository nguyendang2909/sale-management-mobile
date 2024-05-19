import { KeyboardAvoidingView, ScrollView, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useUpdateProductMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { ProductInStockControl } from 'src/containers/form-control/product/form-control-product-in-stock';
import { ProductCapitalPriceControl } from 'src/containers/form-control/product/product-capital-price.control';
import { ProductCategoriesControl } from 'src/containers/form-control/product/product-categories.control';
import { ProductImagesControl } from 'src/containers/form-control/product/product-images.control';
import { ProductPriceControl } from 'src/containers/form-control/product/product-price.control';
import { ProductPromotionalPriceControl } from 'src/containers/form-control/product/product-promotional-price.control';
import { ProductSkuControl } from 'src/containers/form-control/product/product-sku.control';
import { ProductStockControl } from 'src/containers/form-control/product/product-stock.control';
import { ProductTitleControl } from 'src/containers/form-control/product/product-title.control';
import { ProductTrackingStockControl } from 'src/containers/form-control/product/product-tracking-stock.control';
import { ProductUnitControl } from 'src/containers/form-control/product/product-unit.control';
import { useMessages, useProduct } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import { updateProductFormUtil } from 'src/utils';
import { formParamUtil } from 'src/utils/form-params.util';

import { ProductDetailFooter } from './product-detail-footer';

type FCProps = {
  detail: AppStore.Product;
};
export const ProductContent: FC<FCProps> = ({ detail }) => {
  const navigation = useNavigation();
  useCategories();
  const {
    data: product,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
  } = useProduct({ detail });

  const { formatErrorMessage } = useMessages();
  const [updateProductMutation] = useUpdateProductMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormParams.UpdateProduct>({
    defaultValues: updateProductFormUtil.getDefaultValues(product),
    resolver: updateProductFormUtil.getResolver(),
  });

  console.log(errors);

  const isInStock = watch('isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);

  const defaultValues = useMemo(() => updateProductFormUtil.getDefaultValues(product), [product]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormParams.UpdateProduct> = async values => {
    try {
      const { images, categories, skus, attributes, ...restValues } = values;
      const body: ApiRequest.UpdateProduct = {
        ...formParamUtil.getDifferent(restValues, defaultValues),
      };
      if (images) {
        const imageIds = images.map(image => image.id);
        const defaultImageIds = defaultValues.images.map(image => image.id);
        if (!_.isEqual(imageIds, defaultImageIds)) {
          body.imageIds = imageIds;
        }
      }
      if (images?.length) {
        body.imageIds = images.map(e => e.id);
      }
      if (categories.length) {
        body.categoryIds = categories.map(e => e.id);
      }
      await updateProductMutation({ id: product.id, body }).unwrap();
      await refetchProduct();
      Toast.show({ text1: 'Cập nhật sản phẩm thành công', type: 'success' });
      navigation.navigate(SCREENS.HOME, {
        screen: HOME_SCREENS.PRODUCTS,
      });
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
    }
  };

  const attributesValue = watch('attributes');

  const attributeProperties = useMemo(
    () =>
      attributesValue.reduce<{ skuTotal: number }>(
        (acc, attr) => {
          return {
            skuTotal: attr.specifications?.length
              ? acc.skuTotal + attr.specifications.length
              : acc.skuTotal,
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
    <View flex={1}>
      <LoadingOverlay isLoading={isLoading || isLoadingProduct} />
      <View
        as={SafeAreaView}
        // @ts-ignore
        edges={['bottom']}
        flex={1}
      >
        <View flex={1}>
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
                </ScrollView>

                <ProductDetailFooter
                  onUpdate={handleSubmit(onSubmit)}
                  product={product}
                  setLoading={setLoading}
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          </View>
          {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
        </View>
      </View>
    </View>
  );
};
