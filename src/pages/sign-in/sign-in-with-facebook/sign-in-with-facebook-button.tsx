import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { FontAwesome } from 'src/components';
import { useMessages } from 'src/hooks';

export const SignInWithFacebookButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};
  return (
    <Button backgroundColor="$blue600">
      {/*
      //@ts-ignore */}
      <ButtonIcon mr={8} as={FontAwesome} name="facebook"></ButtonIcon>
      <ButtonText>{formatMessage('Sign in with Facebook')}</ButtonText>
    </Button>
  );
};
