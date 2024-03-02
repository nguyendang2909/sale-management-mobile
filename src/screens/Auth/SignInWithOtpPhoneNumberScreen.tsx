import { View } from '@gluestack-ui/themed';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Box, FormControl, Heading, HStack, Text, WarningOutlineIcon } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { useSignInWithPhoneNumberMutation } from 'src/api';
import { LoadingLayout } from 'src/components';
import { LoadingButton } from 'src/components/button';
import { AnimatedOtpInput } from 'src/components/input/animated-otp-input';
import { SCREENS } from 'src/constants';
import { BackIconButton } from 'src/containers/IconButton/BackIconButton';
import { useAppDispatch, useMessages } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { appActions } from 'src/store/app.store';
import {
  flexGrow,
  marginTop,
  paddingHorizontal,
  paddingVertical,
  posititionAbsolute,
} from 'src/styles';
import { spacing } from 'src/theme';
import { AppStackScreenProps } from 'src/types';
import { ValueOf } from 'src/types/common.type';

type FCProps = AppStackScreenProps<'SignInWithOtpPhoneNumber'>;

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
  const [signInWithPhoneNumberMutation] = useSignInWithPhoneNumberMutation();
  const dispatch = useAppDispatch();

  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<ResendStatus>(ResendStatusObj.nonResent);
  const [otpConfirmation, setOtpConfirmation] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >(otpConfirm);

  const signUp = async (e: string) => {
    setIsSubmitting(true);
    if (!otpConfirmation) {
      goBack(SCREENS.SignInWithPhoneNumber);
      return;
    }
    try {
      const credential = await otpConfirmation.confirm(e);
      if (!credential) {
        return;
      }
      const idToken = await credential.user.getIdToken();
      const signInResponse = await signInWithPhoneNumberMutation({
        token: idToken,
      }).unwrap();
      dispatch(appActions.updateAccessToken(signInResponse.data));
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
      goBack(SCREENS.SignInWithPhoneNumber);
    }
  }, [otpConfirmation]);

  const handleResendingOtpCode = async () => {
    if (!user || !user?.phoneNumber) {
      goBack(SCREENS.SignInWithPhoneNumber);
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
    <View flex={1}>
      <LoadingLayout isLoading={isSubmiting} />
      <Box flex={1} safeAreaY>
        <Pressable style={flexGrow} onPress={Keyboard.dismiss}>
          <View style={[paddingHorizontal(spacing.lg), paddingVertical(spacing.lg)]}>
            <View>
              <BackIconButton />
            </View>
            <View>
              <Heading size="2xl">{formatMessage('Enter your code')}</Heading>
            </View>
            <View style={marginTop(spacing.md)}>
              <HStack>
                <Text fontWeight={600} fontSize={18}>
                  {user?.phoneNumber}
                </Text>
              </HStack>
            </View>
          </View>

          <View style={[flexGrow, marginTop(spacing.lg)]}>
            <HStack space="2" style={paddingVertical(spacing.lg)}>
              <FormControl isInvalid={isError}>
                <AnimatedOtpInput
                  otpCount={OTP_MAX_LENGTH}
                  onCodeFilled={handleFullfieldOtp}
                  onCodeChanged={handleChangeOtp}
                />
                <View mx={16}>
                  <FormControl.ErrorMessage
                    textAlign="center"
                    style={posititionAbsolute}
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {isError && formatMessage('Wrong verification code, try again!')}
                  </FormControl.ErrorMessage>
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
                  {formatMessage('Resend OTP code')}
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
