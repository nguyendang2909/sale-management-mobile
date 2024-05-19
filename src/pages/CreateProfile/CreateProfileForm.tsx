import {
  Button,
  ButtonText,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCreateMeMutation } from 'src/api/me.api';
import { FormControlInput, LoadingLayout } from 'src/components';
import { SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';
import { flexGrow } from 'src/styles';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

export const CreateProfileForm: FC = () => {
  const { formatMessage } = useMessages();
  const [createMe] = useCreateMeMutation();
  const navigation = useNavigation();

  const formik = useFormik<FormParams.CreateProfile>({
    initialValues: {
      email: '',
      shopTitle: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email không đúng').notRequired(),
      shopTitle: Yup.string().max(200, 'Tên shop cần ít hơn 200 ký tự').notRequired(),
    }),
    onSubmit: async values => {
      try {
        await createMe(_.pickBy(values, _.identity)).unwrap();
        navigation.dispatch(StackActions.replace(SCREENS.HOME, { screen: 'DatingSwipe' }));
      } catch (error) {
        Toast.show({
          text1: formatMessage('Oops, something went wrong. Please try again.'),
        });
      }
    },
  });

  return (
    <>
      <LoadingLayout isLoading={formik.isSubmitting} />
      <View as={SafeAreaView} flex={1}>
        <View flex={1}>
          <View flex={1}>
            <ScrollView style={flexGrow}>
              <View px={16} py={16}>
                <Heading>Thông tin tài khoản</Heading>
              </View>

              <View px={16}>
                <View mb={16}>
                  <FormControlInput
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    placeholder="Ví dụ: abc@gmail.com"
                    error={formik.touched.email ? formik.errors.email : undefined}
                  />
                </View>

                <View mb={16}>
                  <FormControlInput
                    label="Tên cửa hàng"
                    value={formik.values.shopTitle}
                    onChange={formik.handleChange('shopTitle')}
                    placeholder="Ví dụ: Quán vịt Vân Đình"
                    error={formik.touched.shopTitle ? formik.errors.shopTitle : undefined}
                  />
                </View>
              </View>
            </ScrollView>

            <View px={16} py={16}>
              <Button
                onPress={() => {
                  formik.handleSubmit();
                }}
              >
                <ButtonText>Tiếp tục</ButtonText>
              </Button>
            </View>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </View>
    </>
  );
};
