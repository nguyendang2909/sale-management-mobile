import { View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { ImageBackground } from 'react-native';
import { SignInButtons } from 'src/pages/sign-in/sign-in-buttons';
import { backgroundColor, heightFull, posititionAbsolute, widthFull, zIndex } from 'src/styles';
import { AppStackScreenProps } from 'src/types';

type FCProps = AppStackScreenProps<'SignIn'>;

export const SignInScreen: FC<FCProps> = () => {
  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/girl-smile.jpg')}
        style={[widthFull, heightFull, posititionAbsolute, zIndex(1)]}
      ></ImageBackground>
      <View
        style={[
          widthFull,
          heightFull,
          posititionAbsolute,
          backgroundColor('rgba(0,0,0, 0.60)'),
          zIndex(2),
        ]}
      ></View>

      <View flex={1} justifyContent="center" zIndex={10}>
        <SignInButtons />
      </View>
    </>
  );
};
