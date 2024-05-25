import { Box, Heading, Text, View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { SCREENS } from 'src/constants';
import { APP_NAME } from 'src/constants/constants';
import { SignInWithPhoneNumberForm } from 'src/containers/Form/sign-in-with-phone-number-form';
import { BackIconButton } from 'src/containers/IconButton/BackIconButton';
import { AppStackScreenProps } from 'src/navigators/main-stack';

type FCProps = AppStackScreenProps<'SIGN_IN_WITH_PHONE_NUMBER'>;

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  return (
    <>
      <View as={SafeAreaView} flex={1}>
        <Box flex={1}>
          <View px={24} py={24}>
            <View>
              <BackIconButton prevScreen={SCREENS.SIGN_IN}></BackIconButton>
            </View>
            <Heading size="2xl">Đăng nhập</Heading>
            <Text>Vui lòng nhập số điện thoại để tiếp tục</Text>
          </View>

          <View mt={24} flexGrow={1}>
            <View px={24}>
              <SignInWithPhoneNumberForm />
            </View>
          </View>

          <View>
            <Text textAlign="center">{APP_NAME}</Text>
          </View>
        </Box>
      </View>
    </>
  );
};
