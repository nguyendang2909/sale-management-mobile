import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateProductMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit, useMessages, useProduct } from 'src/hooks';
import { ModalProductOptions } from 'src/screens/product-create/views/modal-product-options/modal-product-options';
import { SectionAdditional } from 'src/screens/product-create/views/section-additional/section-additional';
import { SectionProductBasicInfo } from 'src/screens/product-create/views/section-basic-info/section-product-basic-info';
import { SectionProductClassification } from 'src/screens/product-create/views/section-classification/section-product-classification';
import { SectionStockManagement } from 'src/screens/product-create/views/section-stock-management/section-stock-management';
import { ApiRequest, AppStore, FormParams } from 'src/types';
import { updateProductFormUtil } from 'src/utils';
import { formParamUtil } from 'src/utils/form-params.util';

import { ProductDetailFooter } from './product-detail-footer';

type FCProps = {
  detail: AppStore.Product;
};
export const ContentProduct: FC<FCProps> = ({ detail }) => {
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();
  const [updateProductMutation] = useUpdateProductMutation();
  const {
    data: product,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
  } = useProduct({ detail });

  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    isOpen: isOpenModalProductOptions,
    onOpen: onOpenModalProductOptions,
    onClose: onCloseModalProductOptions,
  } = useDisclose();

  const { isInit: isInitModalProductOptions } = useInit();

  const defaultVariants = useMemo(
    () => updateProductFormUtil.getDefaultVariants(product),
    [product],
  );
  const defaultVariantsMap = useMemo(() => _.keyBy(defaultVariants, 'id'), [defaultVariants]);

  const defaultOptions = useMemo(() => updateProductFormUtil.getDefaultOptions(product), [product]);

  const defaultValues = useMemo(() => updateProductFormUtil.getDefaultValues(product), [product]);

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
    watch,
    getValues,
  } = useForm<FormParams.CreateProduct>({
    defaultValues,
    resolver: updateProductFormUtil.getResolver(),
  });

  const isInStock = watch('variants.0.isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);
  const valueOptions = watch('options');
  const hasDefaultVariant = useMemo(() => valueOptions.length === 0, [valueOptions]);
  const optionValues = valueOptions.reduce<string[]>((acc, option) => {
    return acc.concat(acc.concat(option.values));
  }, []);

  console.log(errors);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const { images, variants, options, ...restValues } = values;
      const body: ApiRequest.UpdateProduct = {
        ...formParamUtil.getDifferent(restValues, defaultValues),
      };
      const imageIds = images.map(image => image.id);
      const defaultImageIds = defaultValues.images.map(image => image.id);
      if (!_.isEqual(imageIds, defaultImageIds)) {
        body.imageIds = imageIds;
      }
      if (!_.isEqual(variants, defaultVariants)) {
        body.variants = variants.map(valueOption => {
          return updateProductFormUtil.getVariantPayload(valueOption, defaultVariantsMap);
        });
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

  const setVariants = useCallback(
    (valueVariants: FormParams.CreateProductVariant[]) => {
      setValue('variants', valueVariants, { shouldDirty: true });
    },
    [setValue],
  );

  const getVariants = useCallback(() => {
    return getValues('variants');
  }, [getValues]);

  const setVariant = useCallback(
    (index: number, valueProductVariant: FormParams.CreateProductVariant) => {
      const valueVariants = getVariants();
      valueVariants[index] = valueProductVariant;
      setValue('variants', valueVariants, { shouldDirty: true });
    },
    [getVariants, setValue],
  );

  const setStock = useCallback(
    (valueStock: number | null) => {
      setValue('variants.0.stock', valueStock);
    },
    [setValue],
  );

  return (
    <>
      <View flex={1}>
        <LoadingOverlay isLoading={isLoading || isLoadingProduct || isSubmitting} />
        <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
          <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
            <ScrollView
              flex={1}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <SectionProductBasicInfo hasDefaultVariant={hasDefaultVariant} control={control} />
              <SectionStockManagement
                mt={16}
                isEnabled={hasDefaultVariant}
                isTrackingStock={isTrackingStock}
                control={control}
                setStock={setStock}
              />
              <SectionProductClassification
                mt={16}
                control={control}
                setVariant={setVariant}
                hasDefaultVariant={hasDefaultVariant}
                getProduct={getValues}
                onOpenModal={onOpenModalProductOptions}
              />
              <SectionAdditional mt={16} />
            </ScrollView>
            <ProductDetailFooter
              bgColor="$white"
              onUpdate={handleSubmit(onSubmit)}
              product={product}
              setLoading={setLoading}
              isLoading={isSubmitting}
              isDirty={isDirty}
              px={16}
              py={16}
            />
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
      <ModalProductOptions
        control={control}
        getVariants={getVariants}
        onClose={onCloseModalProductOptions}
        isOpen={isOpenModalProductOptions}
        setVariants={setVariants}
        defaultOptions={defaultOptions}
        defaultVariants={defaultVariants}
      />
    </>
  );
};
