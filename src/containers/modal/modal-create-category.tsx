import { Button, ButtonText, CloseIcon, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCreateCategoryMutation } from 'src/api';
import { FormControlInput, Header } from 'src/components';
import { useMessages } from 'src/hooks';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

type FCProps = {
  onClose: () => void;
  isVisible: boolean;
};

export const ModalCreateCategory: FC<FCProps> = ({ onClose, isVisible }) => {
  const { formatErrorMessage } = useMessages();
  const [createCategory] = useCreateCategoryMutation();
  const { reset, handleSubmit, control } = useForm<FormParams.CreateCategory>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(
      Yup.object({
        title: Yup.string().required(),
      }),
    ),
  });

  const onSubmit: SubmitHandler<FormParams.CreateCategory> = async values => {
    try {
      await createCategory(values).unwrap();
      reset();
      onClose();
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
      });
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
      </View>
    </Modal>
  );
};
