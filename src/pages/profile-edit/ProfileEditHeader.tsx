import React from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { goBack } from 'src/navigations/navigation-ref';
import { colors } from 'src/theme';

export const ProfileEditPageHeader: React.FC = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.HOME, { screen: 'Profile' });
  };
  return (
    <>
      <Header
        backgroundColor={colors.backgroundSecondary}
        leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        titleTx="Edit profile"
      />
    </>
  );
};
