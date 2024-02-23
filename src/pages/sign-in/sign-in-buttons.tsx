import { View, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';
import { Platform } from 'react-native';
import { LoadingLayout } from 'src/components';
import { SignInWithPhoneNumberButton } from 'src/pages/sign-in/sign-in-with-phone-number/sign-in-with-phone-number-button';

import { SignInWithAppleButton } from './sign-in-with-apple/sign-in-with-apple-button';
import { SignInWithGoogleButton } from './sign-in-with-google/sign-in-with-google-button';

export const SignInButtons = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <>
      <LoadingLayout isLoading={isLoading} />

      <View px={16}>
        <VStack rowGap={16}>
          <View>
            <SignInWithPhoneNumberButton setLoading={setLoading} />
          </View>
          {/* <View>
          <SignInWithFacebookButton />
        </View> */}
          <View>
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
