import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from 'src/api';
import { FontAwesome } from 'src/components';
import { AUTH_GRANT_TYPES } from 'src/constants';
import { useMessages } from 'src/hooks';
import { appActions } from 'src/store/app.store';

type FCProps = {
  setLoading: (e: boolean) => void;
};

export const SignInWithAppleButton: FC<FCProps> = ({ setLoading }) => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  const handlePress = async () => {
    setLoading(true);
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (
        credentialState === appleAuth.State.AUTHORIZED &&
        appleAuthRequestResponse.identityToken
      ) {
        const signInResponse = await signIn({
          token: appleAuthRequestResponse.identityToken,
          grantType: AUTH_GRANT_TYPES.APPLE,
        }).unwrap();
        dispatch(appActions.updateAccessToken(signInResponse.data));
        return;
      }
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={handlePress}
        backgroundColor="$white"
        // @ts-ignore
      >
        <View mr={8}>
          {/*
          @ts-ignore */}
          <ButtonIcon color="$black" mr={8} as={FontAwesome} name="apple"></ButtonIcon>
        </View>
        <ButtonText color="$black">Tiếp tục với Apple</ButtonText>
      </Button>
    </>
  );
};
