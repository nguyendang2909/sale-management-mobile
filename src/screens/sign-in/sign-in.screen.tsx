import { Heading, ScrollView, View } from '@gluestack-ui/themed';
import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingOverlay } from 'src/components';
import { AppStackScreenProps } from 'src/navigators/main.stack';
import { SignInButtons } from 'src/pages/sign-in/sign-in-buttons';

type FCProps = AppStackScreenProps<'SIGN_IN'>;

export const SignInScreen: FC<FCProps> = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      {/* <ImageBackground
        source={require('../../../assets/images/girl-smile.jpg')}
        style={[widthFull, heightFull, posititionAbsolute, zIndex(1)]}
      ></ImageBackground> */}
      {/* <View
        style={[
          widthFull,
          heightFull,
          posititionAbsolute,
          backgroundColor('rgba(0,0,0, 0.60)'),
          zIndex(2),
        ]}
      ></View> */}
      <SafeAreaView edges={['top']}></SafeAreaView>
      <ScrollView flex={1}>
        <View mt={96}>
          <View>
            <Heading textAlign="center">Quản lý kinh doanh</Heading>
          </View>
          <View mt={48}>
            <SignInButtons isLoading={isLoading} setLoading={setLoading} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
