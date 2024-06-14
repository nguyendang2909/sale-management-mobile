import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { TextCapitalize } from 'src/components';
import { TextPrice } from 'src/components/text/text-price';
import { useMessages } from 'src/hooks';
import { Entity, ViewProps } from 'src/types';
import { orderPaymentUtil } from 'src/utils';

import { PaymentStatusTag } from './tag/tag-order-status';

export const Payments: FC<ViewProps & { orderAmount: number; payments: Entity.OrderPayment[] }> = ({
  payments,
  orderAmount,
  ...viewProps
}) => {
  const paymentsAmount = orderPaymentUtil.getAllAmount(payments);
  const { formatMessage } = useMessages();

  const debt = orderAmount - paymentsAmount;

  return (
    <View {...viewProps}>
      <View px={16} mt={16}>
        <View flexDirection="row" justifyContent="space-between">
          <View>
            <Text fontWeight="$semibold" color="$secondary400" textAlign="left">
              Ngày
            </Text>
          </View>
          <View>
            <Text fontWeight="$semibold" textAlign="right" color="$secondary400">
              Số tiền
            </Text>
          </View>
        </View>
      </View>
      <View mt={16} px={16} bgColor="$white" py={16} gap={8}>
        <View justifyContent="space-between" flexDirection="row" alignItems="center">
          <View>
            <PaymentStatusTag debt={debt}></PaymentStatusTag>
          </View>
          <View>{debt > 0 && <TextPrice color="$warning700" value={debt}></TextPrice>}</View>
        </View>
        {payments.map(payment => {
          return (
            <View
              key={payment.id}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <View>
                <Text color="$secondary400" fontSize="$xs" lineHeight="$xs">
                  <FormattedDate value={payment.createdAt} />
                </Text>
                <Text color="$secondary400" fontSize="$xs" lineHeight="$xs">
                  <FormattedTime value={payment.createdAt}></FormattedTime>
                </Text>
              </View>
              <View flex={1} pl={16}>
                <View bgColor="$secondary100" p={8} borderRadius={8}>
                  <View justifyContent="space-between" flexDirection="row" alignItems="center">
                    <View>
                      {!!payment.method && (
                        <TextCapitalize color="$secondary400">
                          {formatMessage(payment.method)}
                        </TextCapitalize>
                      )}
                    </View>
                    <TextPrice value={payment.amount} bold={false}></TextPrice>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
