import {
  Box,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  HStack,
  Text,
  View,
} from '@gluestack-ui/themed';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CircleAlert } from 'lucide-react-native';
import React, { FC, useEffect, useState } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignInByPhoneNumberMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { LoadingButton } from 'src/components/button';
import { AnimatedOtpInput } from 'src/components/input/animated-otp-input';
import { SCREENS } from 'src/constants';
import { BackIconButton } from 'src/containers/IconButton/BackIconButton';
import { useAfterLogin, useAppDispatch, useMessages, useUserData } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';
import { appActions } from 'src/store/app/app.store';
import { flexGrow, marginTop, paddingHorizontal, paddingVertical } from 'src/styles';
import { spacing } from 'src/theme';
import { ValueOf } from 'src/types/common.type';

type FCProps = AppStackScreenProps<'SIGN_IN_WITH_OTP_PHONE_NUMBER'>;

const ResendStatusObj = {
  resent: 'sent',
  resending: 'resending',
  nonResent: 'nonResent',
} as const;

type ResendStatus = ValueOf<typeof ResendStatusObj>;

const OTP_MAX_LENGTH = 6;

export const SignInWithOtpPhoneNumberScreen: FC<FCProps> = props => {
  const { formatMessage } = useMessages();
  const { otpConfirm, user } = props.route.params;
  const [signIn] = useSignInByPhoneNumberMutation();
  const dispatch = useAppDispatch();

  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<ResendStatus>(ResendStatusObj.nonResent);
  const [otpConfirmation, setOtpConfirmation] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >(otpConfirm);

  const { isFetching: isFetchingUserData } = useUserData();

  const { handleAfterLogin } = useAfterLogin();

  const signUp = async (e: string) => {
    setIsSubmitting(true);
    if (!otpConfirmation) {
      goBack(SCREENS.SIGN_IN_WITH_PHONE_NUMBER);
      return;
    }
    try {
      const credential = await otpConfirmation.confirm(e);
      if (!credential) {
        return;
      }
      const idToken = await credential.user.getIdToken();
      const signInResponse = await signIn({
        token: idToken,
      }).unwrap();
      dispatch(appActions.updateAccessToken(signInResponse.data));
      handleAfterLogin();
    } catch (err) {
      setError(true);
      setResendStatus(ResendStatusObj.nonResent);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFullfieldOtp = (e: number) => {
    signUp(e.toString());
  };

  const handleChangeOtp = (_e: number) => {
    setError(false);
  };

  useEffect(() => {
    if (!otpConfirmation) {
      goBack(SCREENS.SIGN_IN_WITH_PHONE_NUMBER);
    }
  }, [otpConfirmation]);

  const handleResendingOtpCode = async () => {
    if (!user || !user?.phoneNumber) {
      goBack(SCREENS.SIGN_IN_WITH_PHONE_NUMBER);
      return;
    }
    try {
      setError(false);
      setResendStatus(ResendStatusObj.resending);
      const confirmation = await auth().signInWithPhoneNumber(user.phoneNumber);
      setOtpConfirmation(confirmation);
      setResendStatus(ResendStatusObj.resent);
    } catch (err) {
      setResendStatus(ResendStatusObj.nonResent);
    }
  };

  return (
    <View as={SafeAreaView} flex={1}>
      <LoadingOverlay isLoading={isSubmiting || isFetchingUserData} />
      <Box flex={1}>
        <Pressable style={flexGrow} onPress={Keyboard.dismiss}>
          <View style={[paddingHorizontal(spacing.lg), paddingVertical(spacing.lg)]}>
            <View>
              <BackIconButton prevScreen={SCREENS.SIGN_IN_WITH_PHONE_NUMBER} />
            </View>
            <View>
              <Heading size="2xl">{formatMessage('Enter your code')}</Heading>
            </View>
            <View style={marginTop(spacing.md)}>
              <HStack>
                <Text bold fontSize={18}>
                  {user?.phoneNumber}
                </Text>
              </HStack>
            </View>
          </View>

          <View style={[flexGrow, marginTop(spacing.lg)]}>
            <HStack rowGap={8} columnGap={8} pt={24}>
              <FormControl isInvalid={isError}>
                <AnimatedOtpInput
                  otpCount={OTP_MAX_LENGTH}
                  onCodeFilled={handleFullfieldOtp}
                  onCodeChanged={handleChangeOtp}
                />
                <View mx={16}>
                  <FormControlError position="absolute">
                    <FormControlErrorIcon as={CircleAlert}></FormControlErrorIcon>
                    <FormControlErrorText>
                      {isError && formatMessage('Wrong verification code, try again!')}
                    </FormControlErrorText>
                  </FormControlError>
                </View>
              </FormControl>
            </HStack>

            <View px={16} style={paddingVertical(spacing.xl)}>
              <View rowGap={24} alignItems="center">
                <LoadingButton
                  width="$full"
                  bgColor="$blue600"
                  isDisabled={isSubmiting}
                  isLoading={resendStatus === ResendStatusObj.resending}
                  onPress={handleResendingOtpCode}
                >
                  <ButtonText>{formatMessage('Resend OTP code')}</ButtonText>
                </LoadingButton>
              </View>
            </View>
          </View>
          <View>
            <Text textAlign="center">{formatMessage('AppName')}</Text>
          </View>
        </Pressable>
      </Box>
    </View>
  );
};
