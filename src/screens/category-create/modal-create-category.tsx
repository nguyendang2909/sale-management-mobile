import { Button, ButtonText, CloseIcon, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, TextInput } from 'react-native';
import { useCreateCategoryMutation } from 'src/api';
import { FormControlInput, Header } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

type FCProps = {
  onClose: () => void;
  isVisible: boolean;
  onChange: (id: string) => void;
};

export const ModalCreateCategory: FC<FCProps> = ({ onClose, isVisible, onChange }) => {
  const navigation = useNavigation();
  const { formatErrorMessage } = useMessages();
  const [createCategory] = useCreateCategoryMutation();
  const [errorResponse, setErrorResponse] = useState<unknown>();
  const defaultValues = {
    title: '',
  };
  const { reset, handleSubmit, control } = useForm<FormParams.CreateCategory>({
    defaultValues,
    resolver: yupResolver(
      Yup.object({
        title: Yup.string().required('Thông tin bắt buộc'),
      }),
    ),
  });

  const onSubmit: SubmitHandler<FormParams.CreateCategory> = async values => {
    try {
      setErrorResponse(null);
      const category = await createCategory(values).unwrap();
      reset(defaultValues);
      onClose();
      navigation.navigate(SCREENS.CATEGORY_PICK_PRODUCTS, {
        detail: category.data,
      });
    } catch (error) {
      setErrorResponse(error);
    }
  };

  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    if (isVisible && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isVisible]);

  // useEffect(() => {
  //   if (isVisible && inputRef.current) {
  //     inputRef.current?.focus();
  //   }
  // }, [inputRef, isVisible]);

  return (
    <Modal animationType="slide" visible={isVisible}>
      <View flex={1}>
        <Header
          leftIcon={CloseIcon}
          onLeftPress={onClose}
          title="Tạo danh mục"
          RightActionComponent={
            <>
              <View mr={12}>
                <Button onPress={handleSubmit(onSubmit)}>
                  <ButtonText>Tạo</ButtonText>
                </Button>
              </View>
            </>
          }
        ></Header>
        <View mt={16}>
          <View mx={12}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                  <FormControlInput
                    isRequired
                    label="Tên danh mục"
                    value={value}
                    onChange={onChange}
                    placeholder="Ví dụ: Tương ớt"
                    onBlur={onBlur}
                    error={error?.message}
                    focusable={true}
                    maxLength={25}
                    ref={textInputRef}
                  />
                );
              }}
            ></Controller>
          </View>
        </View>
        {!!errorResponse && (
          <View px={16}>
            <AlertError mt={16} description={formatErrorMessage(errorResponse)} />
          </View>
        )}
      </View>
    </Modal>
  );
};
