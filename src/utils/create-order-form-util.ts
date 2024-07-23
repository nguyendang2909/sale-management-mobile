import { yupResolver } from '@hookform/resolvers/yup';
import { ORDER_STATUSES_MAP } from 'src/constants';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

class CreateOrderFormUtil {
  getResolver() {
    return yupResolver<FormParams.CreateOrder>(
      Yup.object({
        status: Yup.string().oneOf(Object.values(ORDER_STATUSES_MAP)).required(),
        customerId: Yup.string().uuid().required().nullable(),
        deliveryMethod: Yup.string().required().nullable(),
        note: Yup.string().required().nullable(),
        address: Yup.string().required().nullable(),
      }),
    );
  }

  getDefaultValues(initialValues?: FormParams.CreateOrder): FormParams.CreateOrder {
    return {
      status: ORDER_STATUSES_MAP.PROCESSING,
      deliveryMethod: null,
      customerId: null,
      address: null,
      note: null,
      ...initialValues,
    };
  }
}

export const createOrderFormUtil = new CreateOrderFormUtil();
