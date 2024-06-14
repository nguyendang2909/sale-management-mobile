import { ContentNotifications } from './views/content-notifications';
import { HeaderNotifications } from './views/header/header-notifications';

export const NotificationsScreen = () => {
  return (
    <>
      <HeaderNotifications />
      <ContentNotifications />
    </>
  );
};
