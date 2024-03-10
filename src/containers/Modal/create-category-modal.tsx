import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import { FC } from 'react';
import Toast from 'react-native-toast-message';
import { useCreateCategoryMutation } from 'src/api';
import { FormControlInput, Header } from 'src/components';
import { useMessages } from 'src/hooks';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

type FCProps = {
  onClose: () => void;
};

export const CreateCategoryModal: FC<FCProps> = ({ onClose }) => {
  const { formatErrorMessage } = useMessages();
  const [createCategory] = useCreateCategoryMutation();
  const formik = useFormik<FormParams.CreateCategory>({
    initialValues: {
      title: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(1).required('Thông tin bắt buộc'),
    }),
    onSubmit: async values => {
      try {
        await createCategory(values).unwrap();
        onClose();
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
  });

  return (
    <>
      <Header
        leftIcon="x"
        onLeftPress={onClose}
        title="Tạo danh mục"
        RightActionComponent={
          <>
            <View mr={12}>
              <Button onPress={formik.handleSubmit}>
                <ButtonText>Tạo</ButtonText>
              </Button>
            </View>
          </>
        }
      ></Header>
      <View mt={16}>
        <View mx={12}>
          <FormControlInput
            isRequired
            label="Tên danh mục"
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            placeholder="Ví dụ: Tương ớt"
            error={formik.touched.title ? formik.errors.title : undefined}
          />
        </View>
      </View>
    </>
  );
};
