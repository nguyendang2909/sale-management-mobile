import { Platform } from 'react-native';
import { CommonService } from 'src/commons/service.common';
import { DEVICE_PLATFORMS } from 'src/constants';

class SignedDevicesService extends CommonService {
  getDevicePlatform() {
    const os = Platform.OS;
    if (os === 'ios') {
      return DEVICE_PLATFORMS.IOS;
    }
    if (os === 'android') {
      return DEVICE_PLATFORMS.ANDROID;
    }
    return DEVICE_PLATFORMS.OTHER;
  }
}

export const signedDevicesService = new SignedDevicesService();
