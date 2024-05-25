import { yupResolver } from '@hookform/resolvers/yup';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateProfileFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateProfile>(
      Yup.object({
        email: Yup.string()
          .email('Địa chỉ email không hợp lệlệ')
          .min(1, 'Thông tin bắt buộc')
          .max(200, 'Địa chỉ email quá dài')
          .required('Thông tin bắt buộc')
          .nullable(),
        shopTitle: Yup.string()
          .min(1, 'Thông tin bắt buộc')
          .max(200, 'Tên shop quá dài')
          .required('Thông tin bắt buộc')
          .nullable(),
      }),
    );
  }

  getDefaultValues(): FormParams.CreateProfile {
    return {
      email: null,
      shopTitle: null,
    };
  }
}

export const createProfileFormUtil = new CreateProfileFormUtil();
