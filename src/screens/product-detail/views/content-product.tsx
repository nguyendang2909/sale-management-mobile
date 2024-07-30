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
import { ModalAttributes } from 'src/screens/product-create/views/modal-attributes/modal-attributes';
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
    isOpen: isOpenModalAttributes,
    onOpen: onOpenModalAttributes,
    onClose: onCloseModalAttributes,
  } = useDisclose();

  const { isInit: isInitModalAttributes } = useInit();

  const defaultSkus = useMemo(() => updateProductFormUtil.getDefaultSkus(product), [product]);
  const defaultSkusMap = useMemo(() => _.keyBy(defaultSkus, 'id'), [defaultSkus]);

  const defaultAttributes = useMemo(
    () => updateProductFormUtil.getDefaultAttributes(product),
    [product],
  );

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

  const isInStock = watch('skus.0.isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);
  const attributesValue = watch('attributes');
  const hasDefaultSku = useMemo(() => attributesValue.length === 0, [attributesValue]);
  const specifications = attributesValue.reduce<FormParams.CreateProductSpecification[]>(
    (acc, attr) => {
      const specifications = attr.specifications;
      return acc.concat(acc.concat(specifications));
    },
    [],
  );
  const specificationsMap = _.keyBy(specifications, 'id');

  console.log(errors);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const { images, skus, attributes, ...restValues } = values;
      const body: ApiRequest.UpdateProduct = {
        ...formParamUtil.getDifferent(restValues, defaultValues),
      };
      const imageIds = images.map(image => image.id);
      const defaultImageIds = defaultValues.images.map(image => image.id);
      if (!_.isEqual(imageIds, defaultImageIds)) {
        body.imageIds = imageIds;
      }
      if (!_.isEqual(skus, defaultSkus)) {
        body.skus = skus.map(skuValue => {
          return updateProductFormUtil.getSkuPayload(skuValue, defaultSkusMap);
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

  const setSkus = useCallback(
    (skusValue: FormParams.CreateProductSku[]) => {
      setValue('skus', skusValue, { shouldDirty: true });
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
      setValue('skus', skusValue, { shouldDirty: true });
    },
    [getSkus, setValue],
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
              <SectionProductBasicInfo hasDefaultSku={hasDefaultSku} control={control} />
              <SectionStockManagement
                mt={16}
                isEnabled={hasDefaultSku}
                isTrackingStock={isTrackingStock}
                control={control}
              />
              <SectionProductClassification
                mt={16}
                control={control}
                setSku={setSku}
                hasDefaultSku={hasDefaultSku}
                specificationsMap={specificationsMap}
                getProduct={getValues}
                onOpenModal={onOpenModalAttributes}
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
      <ModalAttributes
        control={control}
        getSkus={getSkus}
        onClose={onCloseModalAttributes}
        isOpen={isOpenModalAttributes}
        setSkus={setSkus}
        defaultAttributes={defaultAttributes}
        defaultSkus={defaultSkus}
      />
    </>
  );
};
