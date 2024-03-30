import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  View,
} from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDeleteProductMutation, useUpdateProductMutation } from 'src/api';
import { FormControlInput, FormControlSwitch } from 'src/components';
import { LoadingScreen } from 'src/components/screen/loading-screen';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useAppDispatch, useMessages, useProduct, useSettings } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';
import { CreateProductImageCards } from 'src/containers/form-control/product/create-product-image-cards';
import { flexGrow } from 'src/styles';
import { ApiRequest, AppStore, Entity, FormParams } from 'src/types';
import * as Yup from 'yup';

import { ProductDetailFooter } from './product-detail-footer';

type FCProps = {
  detail: AppStore.Product;
};
export const ProductDetailForm: FC<FCProps> = ({ detail }) => {
  useCategories();
  const { data: product, isFetching: isFetchingProduct } = useProduct({ detail });
  const { data: settings } = useSettings();

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
      reset();
    }
  }, [reset, product]);

  const onSubmit: SubmitHandler<FormParams.UpdateProduct> = async values => {
    console.log(111);
    try {
      const { images, price, ...restValues } = values;
      const payload: ApiRequest.CreateProduct = { ...restValues, price: price! };
      if (images?.length) {
        payload.imageIds = images.map(e => e.id);
      }
      await updateProductMutation({ id: product.id, payload }).unwrap();
      navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: HOME_SCREENS.PRODUCT }));
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
    }
  };

  const addImage = useCallback(
    async (e: Entity.ProductImage) => {
      const prevImages = getValues('images');
      setValue('images', [...prevImages, e]);
    },
    [getValues, setValue],
  );

  const deleteImage = useCallback(
    (id: string) => {
      const prevImages = getValues('images');
      setValue(
        'images',
        prevImages.filter(e => e.id !== id),
      );
    },
    [getValues, setValue],
  );

  const addCategory = useCallback(
    async (e: Entity.ProductImage) => {
      const prevState = getValues('categories');
      setValue('categories', [...prevState, e]);
    },
    [getValues, setValue],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      const prevState = getValues('categories');
      setValue(
        'categories',
        prevState.filter(e => e.id !== id),
      );
    },
    [getValues, setValue],
  );

  const setCategory = (category: AppStore.Category) => {
    const prevState = getValues('categories');
    if (prevState.find(e => e.id === category.id)) {
      setValue(
        'categories',
        prevState.filter(e => e.id !== category.id),
      );
    } else {
      setValue('categories', [...prevState, category]);
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading || isFetchingProduct} />
      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <View flex={1}>
              <ScrollView style={flexGrow}>
                <View px={16} py={8} bgColor="$white" mb={16}>
                  <View mb={16}>
                    <Controller
                      control={control}
                      name="title"
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <FormControlInput
                          isRequired
                          label="Tên sản phẩm"
                          value={value}
                          onChange={onChange}
                          placeholder="Ví dụ: Tương ớt Chinsu"
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    ></Controller>
                  </View>

                  <View mb={16}>
                    <View>
                      <FormControlLabel>
                        <FormControlLabelText>Ảnh</FormControlLabelText>
                      </FormControlLabel>
                    </View>
                    <View mt={8}>
                      <Controller
                        control={control}
                        name="images"
                        rules={{ required: true }}
                        render={({ field: { value } }) => (
                          <CreateProductImageCards
                            images={value}
                            addImage={addImage}
                            deleteImage={deleteImage}
                          />
                        )}
                      ></Controller>
                    </View>
                  </View>

                  <View mb={16}>
                    <View flexDirection="row" columnGap={16}>
                      <View flex={1}>
                        <Controller
                          control={control}
                          name="price"
                          rules={{ required: true }}
                          render={({ field, fieldState }) => (
                            <FormControlInput
                              isRequired={true}
                              label="Giá bán"
                              inputMode="numeric"
                              value={field.value?.toString()}
                              onChange={e => {
                                field.onChange(e ? +e : null);
                              }}
                              onBlur={field.onBlur}
                              placeholder="0.0"
                              error={fieldState.error?.message}
                            />
                          )}
                        ></Controller>
                      </View>
                      <View flex={1}>
                        <Controller
                          control={control}
                          name="capitalPrice"
                          rules={{ required: true }}
                          render={({ field, fieldState }) => (
                            <FormControlInput
                              label="Giá vốn"
                              inputMode="numeric"
                              value={field.value?.toString()}
                              onChange={e => {
                                field.onChange(e ? +e : undefined);
                              }}
                              placeholder="0.0"
                              error={fieldState.error?.message}
                            />
                          )}
                        ></Controller>
                      </View>
                    </View>
                  </View>

                  <View mb={16}>
                    <Controller
                      control={control}
                      name="promotionalPrice"
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <FormControlInput
                          label="Giá khuyến mãi"
                          inputMode="numeric"
                          value={field.value?.toString()}
                          onChange={e => {
                            field.onChange(e ? +e : undefined);
                          }}
                          placeholder="0.0"
                          error={fieldState.error?.message}
                        />
                      )}
                    ></Controller>
                  </View>

                  <View mb={16}>
                    <Controller
                      control={control}
                      name="unit"
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <FormControlInput
                          label="Đơn vị"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Ví dụ: vỉ"
                          error={fieldState.error?.message}
                        />
                      )}
                    ></Controller>
                  </View>

                  <View mb={16}>
                    {/* <Controller
                      control={control}
                      name="categories"
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <CreateProductCategoryFormControl
                          value={field.value}
                          setCategory={setCategoryId}
                        />
                      )}
                    ></Controller> */}
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
                    <Controller
                      control={control}
                      name="isTrackingStock"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormControlSwitch
                          title="Theo dõi tồn kho"
                          value={field.value}
                          setValue={field.onChange}
                        />
                      )}
                    ></Controller>
                  </View>
                  {!!isTrackingStock && (
                    <Controller
                      control={control}
                      name="inventory"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormControlInput
                          label="Số lượng trong kho"
                          value={field.value?.toString()}
                          onChange={e => {
                            field.onChange(e ? +e : undefined);
                          }}
                          focusable={true}
                        />
                      )}
                    ></Controller>
                  )}
                </View>
                <View mt={16} px={16}>
                  <Icon as={Settings} size="lg" />
                  {/* {settings.showCreateProductTrackingStock ? } */}
                </View>
                <View mt={48}></View>
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
