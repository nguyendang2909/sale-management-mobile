import Toast from 'react-native-toast-message';
import { formatMessage } from 'src/locales/locale';

class NotificationsService {
  updateSuccess() {
    Toast.show({
      text1: formatMessage('Update successfully.'),
    });
  }

  updateFail() {
    Toast.show({
      text1: formatMessage('Update failed, please try again.'),
      type: 'error',
    });
  }
}

export const notificationsService = new NotificationsService();
