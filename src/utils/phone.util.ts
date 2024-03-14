import { BaseUtil } from './base/base.util';

class PhoneUtil extends BaseUtil {
  getPhoneNumber(value: string) {
    return value.replaceAll(' ', '').startsWith('0') ? value.slice(1) : value;
  }

  getFullPhoneNumber({ phoneNumber, phoneCode }: { phoneNumber: string; phoneCode: string }) {
    return `${phoneCode}${this.getPhoneNumber(phoneNumber)}`.replaceAll(' ', '');
  }
}

export const phoneUtil = new PhoneUtil();
