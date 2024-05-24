import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import Toast from 'react-native-toast-message';
import { FontAwesome } from 'src/components';
import { SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';

type FCProps = {
  setLoading: (e: boolean) => void;
};

export const SignInWithPhoneNumberButton: FC<FCProps> = ({ setLoading }) => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();

  const handlePress = () => {
    try {
      setLoading(true);
      navigate(SCREENS.SIGN_IN_WITH_PHONE_NUMBER);
    } catch (err) {
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={handlePress}>
        <View mr={8}>
          {/*
          @ts-ignore */}
          <ButtonIcon mr={8} as={FontAwesome} name="mobile-phone"></ButtonIcon>
        </View>
        <ButtonText>Tiếp tục với số điện thoại</ButtonText>
      </Button>
    </>
  );
};
