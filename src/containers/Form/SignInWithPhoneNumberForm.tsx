import { View } from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { isValidPhoneNumber } from 'libphonenumber-js/max';
import _ from 'lodash';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import React, { FC, useState } from 'react';
import { LoadingButton } from 'src/components/button';
import { SCREENS } from 'src/constants';
import { useAppDispatch, useMessages } from 'src/hooks';
import { messages } from 'src/locales/messages';
import { flexGrow, marginBottom, marginTop, widthFull } from 'src/styles';
import { spacing } from 'src/theme';
import { FormParams, TxKey } from 'src/types';

export const SignInWithPhoneNumberForm: FC = () => {
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
        navigate(SCREENS.SignInWithOtpPhoneNumber, {
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
      <View>
        <View style={marginBottom(spacing.lg)}>
          <View style={widthFull}>
            <FormControl style={widthFull} isInvalid={!!errorCode} isRequired>
              <FormControl.Label>Số điện thoại</FormControl.Label>
              <View style={flexGrow}>
                <Input
                  height={12}
                  size="xl"
                  testID="phoneNumber"
                  variant="underlined"
                  onChangeText={onChangeText}
                  placeholder="Ví dụ: 0971231234"
                  onBlur={formik.handleBlur('phoneNumber')}
                  autoFocus
                ></Input>
              </View>

              <View>
                <FormControl.ErrorMessage
                  position="absolute"
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {!!errorCode && messages[errorCode] && formatMessage(errorCode)}
                </FormControl.ErrorMessage>
              </View>
            </FormControl>
          </View>
        </View>

        <View style={marginTop(spacing.lg)}>
          <LoadingButton onPress={handlePressSubmit} isLoading={formik.isSubmitting}>
            Tiếp tục
          </LoadingButton>
        </View>
      </View>
    </>
  );
};
