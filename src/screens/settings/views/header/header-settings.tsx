import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations/navigation-ref';

export const HeaderSettings: React.FC = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.MANAGEMENT });
  };

  return (
    <>
      <Header
        leftIcon={ChevronLeft}
        onLeftPress={handleLeftPress}
        titleTx="Settings"
        backgroundColor="$backgroundLight100"
      />
    </>
  );
};
