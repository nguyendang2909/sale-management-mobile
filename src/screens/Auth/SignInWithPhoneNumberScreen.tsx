import { Box, Heading, Text, View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { APP_NAME } from 'src/constants/constants';
import { SignInWithPhoneNumberForm } from 'src/containers/Form/SignInWithPhoneNumberForm';
import { BackIconButton } from 'src/containers/IconButton/BackIconButton';
import { useMessages } from 'src/hooks';
import { AppStackScreenProps } from 'src/types';

type FCProps = AppStackScreenProps<'SignInWithPhoneNumber'>;

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { formatMessage } = useMessages();
  return (
    <>
      <SafeAreaView></SafeAreaView>

      <Box flex={1}>
        <View px={24} py={24}>
          <View>
            <BackIconButton></BackIconButton>
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

      <SafeAreaView></SafeAreaView>
    </>
  );
};
