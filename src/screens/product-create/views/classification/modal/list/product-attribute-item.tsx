import { HStack, Text, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { specificationUtil } from 'src/utils/specification.util';
import * as Yup from 'yup';

import { FormEditAttributeTitle } from '../form/form-edit-attribute-title';
import { SpecificationListItem } from './spec-item/specification-list-item';

export const ProductAttributeListItem: FC<{
  attribute: FormParams.CreateProductAttribute;
  setValue: UseFormSetValue<FormParams.CreateProductClassification>;
  getValues: UseFormGetValues<FormParams.CreateProductClassification>;
  index: number;
  onDeleteAttribute: (e: number) => void;
  errorText?: string;
}> = ({ attribute, setValue, index, onDeleteAttribute, errorText, getValues }) => {
  const {
    isOpen: isEdittingAttributeTitle,
    onOpen: editAttributeTitle,
    onClose: onCloseEditAttributeTitle,
  } = useDisclose();

  const { specifications } = attribute;

  const [editingSpecificationId, setEditSpecificationId] = useState<string | null>(null);

  const {
    control: specificationControl,
    setError,
    handleSubmit: handleSubmitSpecification,
    setValue: setValueSpecification,
  } = useForm<{ title: string }>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(
      Yup.object({
        title: Yup.string().min(1, 'Thông tin bắt buộc').required('Thông tin bắt buộc'),
      }),
    ),
  });

  const handleChangeTitle = useCallback(
    (e: string | null) => {
      setValue(`attributes.${index}.title`, e || '');
      onCloseEditAttributeTitle();
    },
    [index, onCloseEditAttributeTitle, setValue],
  );

  const handleDeleteAttribute = useCallback(() => {
    onDeleteAttribute(index);
  }, [index, onDeleteAttribute]);

  const onSubmitSpecification: SubmitHandler<{ title: string }> = async values => {
    const specificationTitle = values.title;
    if (
      specifications.find(e => {
        if (editingSpecificationId) {
          return e.id !== editingSpecificationId && e.title === specificationTitle;
        }
        return e.title === specificationTitle;
      })
    ) {
      setError('title', { type: 'custom', message: 'Phân loại đã tồn tại trong nhóm' });
      return;
    }
    if (editingSpecificationId) {
      setValue(
        `attributes.${index}.specifications`,
        attribute.specifications.map(spec => {
          if (spec.id === editingSpecificationId) {
            return {
              ...spec,
              title: specificationTitle || '',
            };
          }
          return spec;
        }),
      );
      setEditSpecificationId(null);
    } else {
      setValue(
        `attributes.${index}.specifications`,
        attribute.specifications.concat({
          title: specificationTitle || '',
          id: specificationUtil.generateId(),
          type: null,
        }),
      );
    }
    setValueSpecification('title', '');
  };

  const handleDeleteSpecification = useCallback(
    (id: string) => {
      setValue(
        `attributes.${index}.specifications`,
        attribute.specifications.filter(spec => spec.id !== id),
      );
      if (editingSpecificationId === id) {
        setEditSpecificationId(null);
      }
    },
    [attribute.specifications, editingSpecificationId, index, setValue],
  );

  const handlePressSpecification = useCallback(
    (specification: FormParams.CreateProductSpecification) => {
      if (specification.id && specification.id === editingSpecificationId) {
        setEditSpecificationId(null);
        setValueSpecification('title', '');
      } else {
        setEditSpecificationId(specification.id);
        setValueSpecification('title', specification.title);
      }
    },
    [editingSpecificationId, setValueSpecification],
  );

  return (
    <>
      <View px={16} py={16} bgColor="$white">
        {isEdittingAttributeTitle ? (
          <FormEditAttributeTitle
            currentAttributeIndex={index}
            value={attribute.title}
            setValue={handleChangeTitle}
            getValues={getValues}
          />
        ) : (
          <HStack justifyContent="space-between">
            <HStack>
              <View>
                <Text numberOfLines={1} bold>
                  {attribute.title}
                </Text>
              </View>
              <View>
                <IconButtonEdit onPress={editAttributeTitle} />
              </View>
            </HStack>
            <View>
              <IconButtonDelete onPress={handleDeleteAttribute} />
            </View>
          </HStack>
        )}
        <View mt={8}>
          {!!errorText && <AlertError description={errorText} mb={16} />}
          <HStack flexWrap="wrap" gap={8}>
            {attribute.specifications.map(spec => {
              return (
                <SpecificationListItem
                  key={spec.id}
                  specification={spec}
                  onDelete={handleDeleteSpecification}
                  onPress={handlePressSpecification}
                />
              );
            })}
          </HStack>
        </View>
        <View mt={8}>
          <Controller
            control={specificationControl}
            name="title"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <FormControlInputSave
                  onSubmit={handleSubmitSpecification(onSubmitSpecification)}
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
