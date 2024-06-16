import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

class PhoneService {
  async makeCall(phone: string) {
    const callingNumber = `tel:${phone}`;
    try {
      const supported = Linking.canOpenURL(callingNumber);
      if (!supported) {
        Toast.show({ type: 'error', text1: 'Phone number is not available' });
        return;
      }
      await Linking.openURL(callingNumber);
    } catch (err) {
      console.log(111, err);
      Toast.show({ type: 'error', text1: 'Lỗi, vui lòng thử lại' });
    }
  }
}

export const phoneService = new PhoneService();
