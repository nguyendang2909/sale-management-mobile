import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ButtonText,
  Heading,
  View,
} from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLazyFetchCategoryQuery, useUpdateCategoryMutation } from 'src/api';
import { FormControlInput, LoadingButton } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { useMessages } from 'src/hooks';
import { AppStore, FormParams } from 'src/types';
import * as Yup from 'yup';

export const CategoryEditActionsheet: FC<{
  category: AppStore.Category;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, category }) => {
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
      if (isOpen && textInputRef.current) {
        textInputRef.current.focus();
      }
    });
  }, [isOpen]);

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
    <Actionsheet isOpen={isOpen} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent height={400} px={16}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <View w="$full">
          <View>
            <Heading textAlign="center">Danh mục</Heading>
          </View>

          <View w="$full" mt={16}>
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

          <View mt={24}>
            <LoadingButton onPress={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              <ButtonText>Cập nhật</ButtonText>
            </LoadingButton>
          </View>
        </View>

        <SafeAreaView edges={['bottom']} />
      </ActionsheetContent>
    </Actionsheet>
  );
};
