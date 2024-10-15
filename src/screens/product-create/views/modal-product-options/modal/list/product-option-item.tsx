import { HStack, Text, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FC, useCallback, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { FormControlInputSave } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { IconButtonDelete, IconButtonEdit } from 'src/components/icon-button';
import { useDisclose } from 'src/hooks';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

import { FormEditProductOptionTitle } from '../form/form-edit-product-option-title';
import { ProductOptionValueListItem } from './spec-item/product-option-value-list-item';

export const ProductOptionListItem: FC<{
  productOption: FormParams.CreateProductOption;
  setValue: UseFormSetValue<FormParams.CreateProductClassification>;
  getValues: UseFormGetValues<FormParams.CreateProductClassification>;
  index: number;
  onDeleteProductOption: (e: number) => void;
  currentProductOptionValues?: string[];
  errorText?: string;
  defaultOptionValues?: string[];
}> = ({ productOption, setValue, index, onDeleteProductOption, getValues, errorText }) => {
  const {
    isOpen: isEditingProductTitle,
    onOpen: editProductOptionTitle,
    onClose: onCloseEditProductOptionTitle,
  } = useDisclose();
  const { values: productOptionValues } = productOption;

  const [edittingProductOptionValueIndex, setEditProductOptionValueIndex] = useState<number | null>(
    null,
  );

  const {
    control: productOptionValueControl,
    setError,
    handleSubmit: handleSubmitOptionValue,
    setValue: setProductOptionValue,
  } = useForm<{ value: string }>({
    defaultValues: {
      value: '',
    },
    resolver: yupResolver(
      Yup.object({
        value: Yup.string().min(1, 'Thông tin bắt buộc').required('Thông tin bắt buộc'),
      }),
    ),
  });

  const handleChangeProductOptionTitle = useCallback(
    (e: string | null) => {
      setValue(`options.${index}.title`, e || '', { shouldDirty: true });
      onCloseEditProductOptionTitle();
    },
    [index, onCloseEditProductOptionTitle, setValue],
  );

  const handleDeleteProductOption = useCallback(() => {
    onDeleteProductOption(index);
  }, [index, onDeleteProductOption]);

  const onSubmitProductOptionValue: SubmitHandler<{ value: string }> = async values => {
    const newProductOptionValue = values.value;
    const isDuplicateProductOptionValue = productOptionValues.find((e, index) => {
      if (edittingProductOptionValueIndex) {
        return index !== edittingProductOptionValueIndex && e === newProductOptionValue;
      }
      return e === newProductOptionValue;
    });
    if (isDuplicateProductOptionValue) {
      setError('value', { type: 'custom', message: 'Phân loại đã tồn tại trong nhóm' });
      return;
    }
    if (edittingProductOptionValueIndex) {
      setValue(
        `options.${index}.values`,
        productOption.values.map((productOptionValue, index) => {
          if (index === edittingProductOptionValueIndex) {
            return newProductOptionValue;
          }
          return productOptionValue;
        }),
        { shouldDirty: true },
      );
      setEditProductOptionValueIndex(null);
    } else {
      setValue(`options.${index}.values`, productOption.values.concat(newProductOptionValue), {
        shouldDirty: true,
      });
    }
    setProductOptionValue('value', '');
  };

  const handleDeleteProductOptionValue = useCallback(
    (value: string) => {
      setValue(
        `options.${index}.values`,
        productOption.values.filter(productOptionValue => productOptionValue !== value),
        { shouldDirty: true },
      );
      if (!_.isNil(edittingProductOptionValueIndex)) {
        setEditProductOptionValueIndex(null);
      }
    },
    [productOption.values, edittingProductOptionValueIndex, index, setValue],
  );

  const handlePressProductOptionValue = useCallback(
    (productOptionValue: string) => {
      console.log(222223333);
      const productOptionValueIndex = productOptionValues.findIndex(
        value => value === productOptionValue,
      );
      if (productOptionValueIndex) {
        setEditProductOptionValueIndex(null);
        setProductOptionValue('value', '');
      } else {
        setEditProductOptionValueIndex(productOptionValueIndex);
        setProductOptionValue('value', productOptionValue);
      }
    },
    [productOptionValues, setProductOptionValue],
  );

  return (
    <>
      <View px={16} py={16} bgColor="$white">
        {isEditingProductTitle ? (
          <FormEditProductOptionTitle
            currentProductOptionIndex={index}
            value={productOption.title}
            setValue={handleChangeProductOptionTitle}
            getValues={getValues}
          />
        ) : (
          <HStack justifyContent="space-between">
            <HStack>
              <View>
                <Text numberOfLines={1} bold>
                  {productOption.title}
                </Text>
              </View>
              <View>
                <IconButtonEdit onPress={editProductOptionTitle} />
              </View>
            </HStack>
            <View>
              <IconButtonDelete onPress={handleDeleteProductOption} />
            </View>
          </HStack>
        )}
        <View mt={8}>
          {!!errorText && <AlertError description={errorText} mb={16} />}
          <HStack flexWrap="wrap" gap={8}>
            {productOption.values.map((productOptionValue, index) => {
              return (
                <ProductOptionValueListItem
                  key={index}
                  productOptionValue={productOptionValue}
                  onDelete={handleDeleteProductOptionValue}
                  onPress={handlePressProductOptionValue}
                />
              );
            })}
          </HStack>
        </View>
        <View mt={8}>
          <Controller
            control={productOptionValueControl}
            name="value"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <FormControlInputSave
                  onSubmit={handleSubmitOptionValue(onSubmitProductOptionValue)}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Phân loại"
                  error={error?.message}
                />
              );
            }}
          ></Controller>
        </View>
      </View>
    </>
  );
};
