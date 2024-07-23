import { Platform } from 'react-native';
import { CommonService } from 'src/commons/service.common';
import { DEVICE_PLATFORMS_MAP } from 'src/constants';

class SignedDevicesService extends CommonService {
  getDevicePlatform() {
    const os = Platform.OS;
    if (os === 'ios') {
      return DEVICE_PLATFORMS_MAP.IOS;
    }
    if (os === 'android') {
      return DEVICE_PLATFORMS_MAP.ANDROID;
    }
    return DEVICE_PLATFORMS_MAP.OTHER;
  }
}

export const signedDevicesService = new SignedDevicesService();
