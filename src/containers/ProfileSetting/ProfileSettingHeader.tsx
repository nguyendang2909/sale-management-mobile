import React from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { goBack } from 'src/navigations/navigation-ref';

export const ProfileSettingHeader: React.FC = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.HOME, { screen: 'Profile' });
  };

  return (
    <>
      <Header
        // leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        titleTx="Settings"
        backgroundColor="$backgroundLight100"
      />
    </>
  );
};
