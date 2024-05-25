import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  View,
} from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { isValidPhoneNumber } from 'libphonenumber-js/max';
import _ from 'lodash';
import React, { FC, useState } from 'react';
import { LoadingOverlay, MaterialIcons } from 'src/components';
import { SCREENS } from 'src/constants';
import { useAppDispatch, useMessages } from 'src/hooks';
import messages from 'src/locales/messages';
import { widthFull } from 'src/styles';
import { FormParams, TxKey, ViewProps } from 'src/types';

export const SignInWithPhoneNumberForm: FC<ViewProps> = ({ ...viewProps }) => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useMessages();
  const { navigate } = useNavigation();
  const [errorCode, setErrorCode] = useState<TxKey | undefined>();

  // function onAuthStateChanged(user: unknown) {
  //   if (user) {
  //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
  //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
  //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
  //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  //   }
  // }

  const formik = useFormik<FormParams.SignInWithPhoneNumber>({
    initialValues: {
      phoneCode: '+84',
      phoneNumber: '',
    },
    onSubmit: async values => {
      setErrorCode(undefined);
      try {
        const { phoneNumber, phoneCode } = values;
        const fullPhoneNumber = `${phoneCode}${
          phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber
        }`.replaceAll(' ', '');
        if (!isValidPhoneNumber(fullPhoneNumber, 'VN')) {
          setErrorCode('Please enter a valid phone number!');
          return;
        }
        const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
        navigate(SCREENS.SIGN_IN_WITH_OTP_PHONE_NUMBER, {
          otpConfirm: confirmation,
          user: { phoneNumber: fullPhoneNumber },
        });
      } catch (err) {
        setErrorCode(_.get(err, 'message'));
      }
    },
  });

  const handlePressSubmit = () => {
    formik.handleSubmit();
  };

  const onChangeText = (text: string) => {
    setErrorCode(undefined);
    formik.setFieldValue('phoneNumber', text);
  };

  return (
    <>
      <LoadingOverlay isLoading={formik.isSubmitting}></LoadingOverlay>
      <View {...viewProps}>
        <View mb={24}>
          <View style={widthFull}>
            <FormControl style={widthFull} isInvalid={!!errorCode} isRequired>
              <FormControlLabel>
                <FormControlLabelText>Số điện thoại</FormControlLabelText>
              </FormControlLabel>
              <Input variant="underlined">
                <InputField
                  inputMode="numeric"
                  // value={value || ''}
                  onChangeText={onChangeText}
                  placeholder="Ví dụ: 0971231234"
                  maxLength={20}
                  // onBlur={onBlur}
                ></InputField>
              </Input>
              <View>
                <FormControlError position="absolute">
                  <FormControlErrorIcon
                    as={MaterialIcons}
                    // @ts-ignore
                    name="error-outline"
                  ></FormControlErrorIcon>
                  <FormControlErrorText>
                    {!!errorCode && messages[errorCode] && formatMessage(errorCode)}
                  </FormControlErrorText>
                </FormControlError>
              </View>
            </FormControl>
          </View>
        </View>
        <View mt={48}>
          <Button onPress={handlePressSubmit}>
            <ButtonText>Tiếp tục</ButtonText>
          </Button>
        </View>
      </View>
    </>
  );
};
