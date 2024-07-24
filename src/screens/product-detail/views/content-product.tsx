import { KeyboardAvoidingView, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateProductMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useMessages, useProduct } from 'src/hooks';
import { SectionAdditional } from 'src/screens/product-create/views/section-additional/section-additional';
import { SectionProductBasicInfo } from 'src/screens/product-create/views/section-basic-info/section-product-basic-info';
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

  const defaultValues = useMemo(() => updateProductFormUtil.getDefaultValues(product), [product]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormParams.UpdateProduct> = async values => {
    try {
      const { images, skus, attributes, ...restValues } = values;
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
      // await updateProductMutation({ id: product.id, body }).unwrap();
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

  const isInStock = watch('skus.0.isInStock');
  const isTrackingStock = useMemo(() => isInStock === null, [isInStock]);
  const attributesValue = watch('attributes');
  const hasDefaultSku = useMemo(() => attributesValue.length === 0, [attributesValue]);

  return (
    <View flex={1}>
      <LoadingOverlay isLoading={isLoading || isLoadingProduct || isSubmitting} />
      <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
        <KeyboardAvoidingView flex={1} behavior="padding" enabled keyboardVerticalOffset={120}>
          <ScrollView
            flex={1}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SectionProductBasicInfo
              hasDefaultSku={hasDefaultSku}
              // @ts-ignore
              control={control}
            />
            <SectionStockManagement
              mt={16}
              isEnabled={hasDefaultSku}
              isTrackingStock={isTrackingStock}
              control={control}
            />
            <SectionAdditional mt={16} />
          </ScrollView>
          <ProductDetailFooter
            bgColor="$white"
            onUpdate={handleSubmit(onSubmit)}
            product={product}
            setLoading={setLoading}
            isLoading={isSubmitting}
            px={16}
            py={16}
          />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
};
