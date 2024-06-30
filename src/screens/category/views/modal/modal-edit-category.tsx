import {
  ButtonText,
  CloseIcon,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, TextInput } from 'react-native';
import { useLazyFetchCategoryQuery, useUpdateCategoryMutation } from 'src/api';
import { FormControlInput, Header, LoadingButton, ViewFooter } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { useMessages } from 'src/hooks';
import { AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

export const ModalEditCategory: FC<
  ComponentProps<typeof Modal> & {
    category: AppStore.Category;
    onClose: () => void;
  }
> = ({ onClose, category, ...restModalProps }) => {
  const [updateCategoryMutation] = useUpdateCategoryMutation();
  const [fetchCategory] = useLazyFetchCategoryQuery();
  const { formatErrorMessage } = useMessages();
  const [errorResponse, setErrorResponse] = useState<any>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormParams.UpdateCategory>({
    defaultValues: {
      title: category.title || '',
    },
    resolver: yupResolver(
      Yup.object({
        title: Yup.string().required(),
      }),
    ),
  });

  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    setTimeout(() => {
      if (restModalProps.visible && textInputRef.current) {
        textInputRef.current.focus();
      }
    });
  }, [restModalProps.visible]);

  const onSubmit: SubmitHandler<FormParams.UpdateCategory> = async values => {
    try {
      setErrorResponse(null);
      await updateCategoryMutation({ id: category.id, body: values }).unwrap();
      await fetchCategory(category.id);
      onClose();
    } catch (error) {
      setErrorResponse(error);
    }
  };

  const handleClose = () => {
    onClose();
    setErrorResponse(null);
  };

  return (
    <Modal animationType="slide" {...restModalProps}>
      <Header leftIcon={CloseIcon} onLeftPress={handleClose} title="Danh mục"></Header>
      <KeyboardAvoidingView behavior="padding" enabled flex={1}>
        <ScrollView
          px={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View mt={16}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                  <FormControlInput
                    label="Tên danh mục"
                    value={value}
                    onChange={onChange}
                    placeholder="Ví dụ: Tương ớt"
                    onBlur={onBlur}
                    error={error?.message}
                    isRequired
                    focusable={true}
                    maxLength={25}
                    ref={textInputRef}
                  />
                );
              }}
            ></Controller>
          </View>

          {!!errorResponse && (
            <AlertError mt={16} description={formatErrorMessage(errorResponse)} />
          )}
        </ScrollView>
        <ViewFooter py={16} px={16}>
          <LoadingButton onPress={handleSubmit(onSubmit)} isLoading={isSubmitting}>
            <ButtonText>Cập nhật</ButtonText>
          </LoadingButton>
        </ViewFooter>
      </KeyboardAvoidingView>
    </Modal>
  );
};
