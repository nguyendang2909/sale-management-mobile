import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import { ChevronLeft } from 'lucide-react-native';
import { FC } from 'react';
import Toast from 'react-native-toast-message';
import { useCreateCustomerMutation } from 'src/api';
import { FormControlInput, Header } from 'src/components';
import { useMessages } from 'src/hooks';
import { ApiRequest, FormParams } from 'src/types';
import { phoneUtil } from 'src/utils/phone.util';
import * as Yup from 'yup';

type FCProps = {
  onClose: () => void;
};

export const CreateCustomerModal: FC<FCProps> = ({ onClose }) => {
  const { formatErrorMessage } = useMessages();
  const [createCustomer] = useCreateCustomerMutation();
  const formik = useFormik<FormParams.CreateCustomer>({
    initialValues: {
      fullName: '',
      phoneCode: '+84',
      phoneNumber: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      fullName: Yup.string().min(1).max(200).required('Thông tin bắt buộc'),
      phoneCode: Yup.string().min(1).max(20).optional(),
      phoneNumber: Yup.string().min(1).max(20).optional(),
    }),
    onSubmit: async values => {
      try {
        const payload: ApiRequest.CreateCustomer = {
          fullName: values.fullName,
        };
        if (values.phoneNumber) {
          payload.phoneCode = values.phoneCode;
          payload.phoneNumber = phoneUtil.getPhoneNumber(values.phoneNumber);
        }
        await createCustomer(payload).unwrap();
        formik.resetForm();
        onClose();
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Header
        leftIcon={ChevronLeft}
        onLeftPress={onClose}
        title="Khách hàng"
        RightActionComponent={
          <>
            <View mr={12}>
              <Button onPress={handleSubmit}>
                <ButtonText>Tạo</ButtonText>
              </Button>
            </View>
          </>
        }
      ></Header>
      <View mt={16} mx={12}>
        <View>
          <FormControlInput
            isRequired
            label="Tên khách hàng"
            value={formik.values.fullName}
            onChange={formik.handleChange('fullName')}
            placeholder="Nguyễn Văn A"
            error={formik.touched.fullName ? formik.errors.fullName : undefined}
          />
        </View>
        <View>
          <FormControlInput
            label="Số điện thoại"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange('phoneNumber')}
            placeholder="0979999999"
            error={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
          />
        </View>
      </View>
    </>
  );
};
