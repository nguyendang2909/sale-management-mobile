import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { FC, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateProductMutation } from 'src/api';
import { FormControlInput, FormControlSwitch } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useMessages, useProduct } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { CreateProductImageCards } from 'src/screens/product-create/components/create-product-images/create-product-image-cards';
import { CreateProductCategoryFormControl } from 'src/screens/product-create/components/form-items/create-product-category-form-control';
import { flexGrow } from 'src/styles';
import { ApiRequest, AppStore, Entity, FormParams } from 'src/types';
import * as Yup from 'yup';

import { ProductDetailFooter } from './product-detail-footer';

type FCProps = {
  detail: AppStore.Product;
};
export const ProductDetailForm: FC<FCProps> = ({ detail }) => {
  useCategories();
  const { data: product } = useProduct({ detail });
  const navigation = useNavigation();
  const { formatMessage, formatErrorMessage } = useMessages();
  const [updateProductMutation] = useUpdateProductMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const formik = useFormik<FormParams.CreateProduct>({
    initialValues: {
      title: '',
      price: undefined,
      capitalPrice: undefined,
      promotionalPrice: undefined,
      wholesalePrice: undefined,
      isInStock: true,
      isTrackingStock: false,
      sku: '',
      unit: '',
      createMore: false,
      categoryIds: [],
      images: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(1).required('Thông tin bắt buộc'),
      price: Yup.number().positive().notOneOf([0]).required('Thông tin bắt buộc'),
      capitalPrice: Yup.number().positive().optional(),
      promotionPrice: Yup.number().positive().optional(),
      wholesalePrice: Yup.number().positive().optional(),
      isInStock: Yup.boolean().optional(),
      isTrackingStock: Yup.boolean().optional(),
      sku: Yup.string().max(200).optional(),
      unit: Yup.string().max(50).optional(),
      categoryIds: Yup.array().max(5).optional(),
    }),
    onSubmit: async values => {
      try {
        const { createMore, images, price, ...restValues } = values;
        const payload: ApiRequest.CreateProduct = { ...restValues, price: price! };
        if (images.length) {
          payload.imageIds = images.map(e => e.id);
        }
        await updateProductMutation({ id: product.id, payload }).unwrap();
        if (createMore) {
          formik.resetForm();
          return;
        }
        navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: HOME_SCREENS.PRODUCT }));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
  });
  const { setFieldValue } = formik;
  const isFormLoading = formik.isSubmitting || isLoading;

  const addImage = useCallback(
    async (e: Entity.ProductImage) => {
      setFieldValue('images', [...formik.values.images, e]);
    },
    [formik.values.images, setFieldValue],
  );

  const deleteImage = useCallback(
    (id: string) => {
      setFieldValue(
        'images',
        formik.values.images.filter(e => e.id !== id),
      );
    },
    [formik.values.images, setFieldValue],
  );

  const handleChangeTrackingStock = (e: boolean) => {
    formik.setFieldValue('isTrackingStock', e);
  };

  const setCategoryId = useCallback(
    (categoryId: string, value: boolean) => {
      setFieldValue(
        'categoryIds',
        value && formik.values.categoryIds.length < 5
          ? _.uniq(formik.values.categoryIds.concat(categoryId))
          : formik.values.categoryIds.filter(e => e !== categoryId),
      );
    },
    [formik.values.categoryIds, setFieldValue],
  );

  const handleClickDeleteProduct = () => {};

  const handleDeleteProduct = async () => {
    try {
      await deleteProductMutation(product.id).unwrap();
    } catch (err) {
      Toast.show({
        text1: 'Xoá sản phẩm thất bại, vui lòng thử lại',
        type: 'error',
      });
    }
  };

  return (
    <>
      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <ScrollView style={flexGrow}>
                <View px={16} py={8} bgColor="$white" mb={16}>
                  <View mb={16}>
                    <FormControlInput
                      isRequired
                      label="Tên sản phẩm"
                      value={formik.values.title}
                      onChange={formik.handleChange('title')}
                      placeholder="Ví dụ: Tương ớt Chinsu"
                      error={formik.touched.title ? formik.errors.title : undefined}
                    />
                  </View>

                  <View mb={16}>
                    <View>
                      <FormControlLabel>
                        <FormControlLabelText>Ảnh</FormControlLabelText>
                      </FormControlLabel>
                    </View>
                    <View mt={8}>
                      <CreateProductImageCards
                        images={formik.values.images}
                        addImage={addImage}
                        deleteImage={deleteImage}
                      />
                    </View>
                  </View>

                  <View mb={16}>
                    <View flexDirection="row" columnGap={16}>
                      <View flex={1}>
                        <FormControlInput
                          isRequired={true}
                          label="Giá bán"
                          inputMode="numeric"
                          value={formik.values.price?.toString()}
                          onChange={e => {
                            formik.setFieldValue('price', e ? +e : undefined);
                          }}
                          placeholder="0.0"
                          error={formik.touched.price ? formik.errors.price : undefined}
                        />
                      </View>
                      <View flex={1}>
                        <FormControlInput
                          label="Giá vốn"
                          inputMode="numeric"
                          value={formik.values.capitalPrice?.toString()}
                          onChange={e => {
                            formik.setFieldValue('capitalPrice', e ? +e : undefined);
                          }}
                          placeholder="0.0"
                          error={
                            formik.touched.capitalPrice ? formik.errors.capitalPrice : undefined
                          }
                        />
                      </View>
                    </View>
                  </View>

                  <View mb={16}>
                    <FormControlInput
                      label="Giá khuyến mãi"
                      inputMode="numeric"
                      value={formik.values.promotionalPrice?.toString()}
                      onChange={e => {
                        formik.setFieldValue('promotionalPrice', e ? +e : undefined);
                      }}
                      placeholder="0.0"
                      error={
                        formik.touched.promotionalPrice ? formik.errors.promotionalPrice : undefined
                      }
                    />
                  </View>

                  <View mb={16}>
                    <FormControlInput
                      label="Đơn vị"
                      value={formik.values.unit}
                      onChange={formik.handleChange('unit')}
                      placeholder="Ví dụ: vỉ"
                      error={formik.touched.unit ? formik.errors.unit : undefined}
                    />
                  </View>

                  <View mb={16}>
                    <CreateProductCategoryFormControl
                      value={formik.values.categoryIds}
                      setCategory={setCategoryId}
                    />
                  </View>
                </View>
                <View px={16} py={16} bgColor="$white">
                  <View>
                    <Heading>Quản lý tồn kho</Heading>
                  </View>
                  <View mt={16}>
                    <FormControl flexDirection="row" justifyContent="space-between">
                      <FormControlLabel>
                        <FormControlLabelText>Còn hàng</FormControlLabelText>
                      </FormControlLabel>
                      <View>
                        <Switch></Switch>
                      </View>
                    </FormControl>
                  </View>
                  <View mt={16}>
                    <FormControlSwitch
                      title="Theo dõi tồn kho"
                      value={formik.values.isTrackingStock}
                      setValue={handleChangeTrackingStock}
                    />
                  </View>
                </View>
              </ScrollView>

              <ProductDetailFooter
                onUpdate={formik.handleSubmit}
                product={product}
                setLoading={setLoading}
                isLoading={isFormLoading}
              />
            </View>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </View>
    </>
  );
};
