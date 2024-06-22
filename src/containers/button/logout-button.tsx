import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { useDispatch } from 'react-redux';
import { api, useLogoutMutation } from 'src/api';
import { LoadingButton } from 'src/components/button';
import { useAppSelector } from 'src/hooks';
import { appActions } from 'src/store/app/app.store';

type FC = React.ComponentProps<typeof Button>;

export const LogoutButton: React.FC<FC> = () => {
  const dispatch = useDispatch();
  const refreshToken = useAppSelector(s => s.app.refreshToken);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    if (refreshToken) {
      logout({ refreshToken });
    }
    dispatch(appActions.logout());
    dispatch(api.util.resetApiState());
  };

  return (
    <>
      <LoadingButton isLoading={isLoading} onPress={handleLogout}>
        <ButtonText>Đăng xuất</ButtonText>
      </LoadingButton>
    </>
  );
};
