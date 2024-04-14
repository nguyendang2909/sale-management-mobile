import { KeyboardAvoidingView, ScrollView, Text, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDeleteProductMutation, useUpdateProductMutation } from 'src/api';
import { LoadingScreen } from 'src/components/screen/loading-screen';
import { HOME_SCREENS } from 'src/constants';
import { FormControlProductAdditional } from 'src/containers/form-control/product/form-control-product-additional';
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
import { useAppDispatch, useMessages, useProduct, useProductSettings } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

import { ProductDetailFooter } from './product-detail-footer';

type FCProps = {
  detail: AppStore.Product;
};
export const ProductDetailForm: FC<FCProps> = ({ detail }) => {
  useCategories();
  const {
    data: product,
    isFetching: isFetchingProduct,
    refetch: refetchProduct,
  } = useProduct({ detail });
  const { data: settings } = useProductSettings();

  const [deleteProductMutation] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { formatMessage, formatErrorMessage } = useMessages();
  const [updateProductMutation] = useUpdateProductMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const defaultValues = useMemo(
    (): FormParams.UpdateProduct => ({
      title: product.title || '',
      price: product.price || null,
      capitalPrice: product.capitalPrice || null,
      promotionalPrice: product.promotionalPrice || null,
      wholesalePrice: product.wholesalePrice || null,
      isInStock: product.isInStock || true,
      isTrackingStock: product.isTrackingStock || false,
      sku: product.sku || '',
      unit: product.unit || '',
      categories: product.categories || [],
      images: product.imagePaths || [],
      minWholesalePriceQuantity: product.minWholesalePriceQuantity || null,
      barcode: product.barcode || '',
      inventory: product.inventory || null,
      description: product.description || '',
      label: product.label || '',
    }),
    [
      product.barcode,
      product.capitalPrice,
      product.categories,
      product.description,
      product.imagePaths,
      product.inventory,
      product.isInStock,
      product.isTrackingStock,
      product.label,
      product.minWholesalePriceQuantity,
      product.price,
      product.promotionalPrice,
      product.sku,
      product.title,
      product.unit,
      product.wholesalePrice,
    ],
  );

  const resolver = yupResolver<FormParams.UpdateProduct>(
    // @ts-ignore
    Yup.object({
      title: Yup.string()
        .min(1, 'Thông tin bắt buộc')
        .max(200, 'Tên sản phẩm ít hơn 200 ký tự')
        .required('Thông tin bắt buộc'),
      price: Yup.number()
        .positive('Giá không đúng')
        .notOneOf([0], 'Giá không đúng')
        .required('Thông tin bắt buộc'),
      capitalPrice: Yup.number()
        .positive('Giá không đúng')
        .notOneOf([0], 'Giá không đúng')
        .nullable()
        .optional(),
      promotionalPrice: Yup.number()
        .positive('Giá không đúng')
        .notOneOf([0], 'Giá không đúng')
        .nullable()
        .optional(),
      wholesalePrice: Yup.number()
        .positive('Giá không đúng')
        .notOneOf([0], 'Giá không đúng')
        .nullable()
        .optional(),
      isInStock: Yup.boolean().optional(),
      isTrackingStock: Yup.boolean().optional(),
      sku: Yup.string().max(200).optional(),
      unit: Yup.string().max(50).optional(),
      // categories: Yup.array().max(5).optional(),
      // images: Yup.array().max(6).required(),
      // minWholesalePriceQuantity: Yup.number().integer('Số lượng sản phẩm không đúng').optional(),
      barcode: Yup.string().optional(),
      inventory: Yup.number().integer('Số lượng tồn kho không đúng').nullable().optional(),
      description: Yup.string().max(10000).optional(),
      label: Yup.string().optional(),
    }),
  );

  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = useForm<FormParams.UpdateProduct>({
    defaultValues,
    resolver,
  });

  const isTrackingStock = watch('isTrackingStock');

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
  }, [defaultValues, product, reset]);

  const onSubmit: SubmitHandler<FormParams.UpdateProduct> = async values => {
    try {
      const { images, price, categories, ...restValues } = values;
      const body: ApiRequest.UpdateProduct = { ...restValues, price: price! };
      if (images?.length) {
        body.imageIds = images.map(e => e.id);
      }
      if (categories.length) {
        body.categoryIds = categories.map(e => e.id);
      }
      await updateProductMutation({ id: product.id, body }).unwrap();
      await refetchProduct();
      Toast.show({ text1: 'Cập nhật sản phẩm thành công', type: 'success' });
      navigation.navigate(HOME_SCREENS.PRODUCT);
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading || isFetchingProduct} />
      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <ScrollView flex={1}>
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
    </>
  );
};
