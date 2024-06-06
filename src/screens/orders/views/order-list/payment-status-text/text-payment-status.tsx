import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextProps } from 'src/types';

export const TextPaymentStatus: FC<
  TextProps & {
    orderAmount: number;
    paymentAmount: number;
  }
> = ({ orderAmount, paymentAmount, ...textProp }) => {
  if (orderAmount === paymentAmount) {
    return (
      <Text {...textProp} color="$success500">
        Đã thanh toán
      </Text>
    );
  }
  if (orderAmount <= paymentAmount) {
    return (
      <Text {...textProp} color="$secondary700">
        Tiền thừa
      </Text>
    );
  }
  if (paymentAmount) {
    return (
      <Text {...textProp} color="$warning600">
        Thanh toán một phần
      </Text>
    );
  }
  return null;
};
