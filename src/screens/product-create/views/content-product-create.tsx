import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useCreateProductMutation, useLazyFetchProductQuery } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit, useMessages } from 'src/hooks';
import { ApiRequest, FormParams } from 'src/types';
import { createProductFormUtil } from 'src/utils';

import { SectionFooter } from './footer/section-footer';
import { ModalAttributes } from './modal-attributes/modal-attributes';
import { SectionAdditional } from './section-additional/section-additional';
import { SectionProductBasicInfo } from './section-basic-info/section-product-basic-info';
import { SectionProductClassification } from './section-classification/section-product-classification';
import { SectionStockManagement } from './section-stock-management/section-stock-management';

export const ContentProductCreate: FC = () => {
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();
  const [createProduct] = useCreateProductMutation();
  const [fetchProduct] = useLazyFetchProductQuery();

  const {
    isOpen: shouldCreateMore,
    onOpen: setCreateMore,
    onClose: cancelCreateMore,
  } = useDisclose();

  const {
    isOpen: isOpenModalAttributes,
    onOpen: onOpenModalAttributes,
    onClose: onCloseModalAttributes,
  } = useDisclose();

  const { isInit: isInitModalAttributes } = useInit();

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
        <LoadingOverlay isLoading={isSubmitting} />
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
        </KeyboardAvoidingView>

        <SectionFooter
          isSubmitting={isSubmitting}
          onCreate={handleCreateProduct}
          onCreateMore={handleCreateMoreProduct}
          px={16}
          py={16}
        />
      </View>
      <ModalAttributes
        control={control}
        getSkus={getSkus}
        onClose={onCloseModalAttributes}
        isOpen={isOpenModalAttributes}
        setSkus={setSkus}
      />
    </>
  );
};
