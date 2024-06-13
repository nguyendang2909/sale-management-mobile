import { FC, useCallback } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderReports: FC<{ allowBack?: boolean }> = ({ allowBack }) => {
  const handleLeftPress = useCallback(() => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.MANAGEMENT });
  }, []);
  return (
    <Header
      title="Báo cáo"
      {...(allowBack
        ? {
            // leftIcon: ChevronLeft,
            onLeftPress: handleLeftPress,
          }
        : undefined)}
    />
  );
};
