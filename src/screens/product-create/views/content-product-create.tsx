import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
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
import { ModalProductOptions } from './modal-product-options/modal-product-options';
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
    isOpen: isOpenModalProductOptions,
    onOpen: onOpenModalProductOptions,
    onClose: onCloseModalProductOptions,
  } = useDisclose();

  const { isInit: isInitModalProductOptions } = useInit();

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

  const isInStock = watch('variants.0.isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);
  const valueProductOptions = watch('options');
  const hasDefaultVariant = useMemo(() => valueProductOptions.length === 0, [valueProductOptions]);
  const productOptionValues = valueProductOptions.reduce<string[]>((acc, productOption) => {
    const optionValue = productOption.values;
    return acc.concat(acc.concat(optionValue));
  }, []);
  const productOptionsSet = new Set(...productOptionValues);

  const onSubmit: SubmitHandler<FormParams.CreateProduct> = async values => {
    try {
      const { images, variants, ...restValues } = values;
      const payload: ApiRequest.CreateProduct = {
        ...restValues,
        variants: variants.map(e => ({ ...e, price: e.price || 0 })),
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
    (index: number, valueVariant: FormParams.CreateProductVariant) => {
      const valueVariants = getVariants();
      valueVariants[index] = valueVariant;
      setValue('variants', valueVariants, { shouldDirty: true });
    },
    [getVariants, setValue],
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
            <SectionProductBasicInfo hasDefaultSku={hasDefaultVariant} control={control} />
            <SectionStockManagement
              mt={16}
              isEnabled={hasDefaultVariant}
              isTrackingStock={isTrackingStock}
              control={control}
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
        </KeyboardAvoidingView>

        <SectionFooter
          isSubmitting={isSubmitting}
          onCreate={handleCreateProduct}
          onCreateMore={handleCreateMoreProduct}
          px={16}
          py={16}
        />
      </View>
      <ModalProductOptions
        control={control}
        getVariants={getVariants}
        onClose={onCloseModalProductOptions}
        isOpen={isOpenModalProductOptions}
        setVariants={setVariants}
      />
    </>
  );
};
