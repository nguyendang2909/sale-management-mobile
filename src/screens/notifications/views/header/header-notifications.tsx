import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderNotifications = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.MANAGEMENT,
    });
  };
  return (
    <>
      <Header onLeftPress={handleLeftPress} title="Thông báo"></Header>
    </>
  );
};
