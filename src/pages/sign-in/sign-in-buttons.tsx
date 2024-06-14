import { Divider, Text, View, VStack } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Platform } from 'react-native';
import { SignInWithPhoneNumberButton } from 'src/pages/sign-in/sign-in-with-phone-number/sign-in-with-phone-number-button';

import { SignInWithAppleButton } from './sign-in-with-apple/sign-in-with-apple-button';
import { SignInWithGoogleButton } from './sign-in-with-google/sign-in-with-google-button';

export const SignInButtons: FC<{ isLoading: boolean; setLoading: (e: boolean) => void }> = ({
  setLoading,
}) => {
  return (
    <>
      <View px={16}>
        <VStack rowGap={16}>
          <View>
            <SignInWithPhoneNumberButton setLoading={setLoading} />
          </View>
          <View mt={24}>
            <View position="absolute" left={0} right={0} top={8}>
              <Divider />
            </View>
            <View justifyContent="center" alignItems="center">
              <Text fontSize={14} lineHeight={16} backgroundColor="$backgroundLight100" px={8}>
                Hoặc
              </Text>
            </View>
          </View>
          <View mt={24}>
            <SignInWithGoogleButton setLoading={setLoading} />
          </View>
          {Platform.OS === 'ios' && (
            <View>
              <SignInWithAppleButton setLoading={setLoading} />
            </View>
          )}
        </VStack>
      </View>
    </>
  );
};
