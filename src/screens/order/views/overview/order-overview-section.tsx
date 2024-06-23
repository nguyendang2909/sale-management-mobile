import { Button, ButtonText, Divider, HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { FormattedDate } from 'react-intl';
import { ButtonClipboard } from 'src/components/clipboard/button-clipboard';
import { TextPrice } from 'src/components/text/text-price';
import { TextPaymentStatus } from 'src/screens/orders/views/order-list/payment-status-text/text-payment-status';
import { OrderCardStatusTag } from 'src/screens/orders/views/tags/order-card-status-tag';
import { OrderStatus, ViewProps } from 'src/types';

export const OrderOverviewSection: FC<
  ViewProps & {
    orderAmount: number;
    paymentAmount: number;
    orderStatus: OrderStatus;
    orderCode?: string;
    orderAt?: string;
  }
> = ({ orderAmount, paymentAmount, orderStatus, orderCode, orderAt, ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View>
        {orderStatus && (
          <View position="absolute" right={0}>
            <OrderCardStatusTag status={orderStatus} />
          </View>
        )}
        <HStack alignItems="center" columnGap={8}>
          <Text color="$textLight900">{orderCode}</Text>
          <View>
            <ButtonClipboard value={orderCode} />
          </View>
        </HStack>

        <View>
          <Text size="sm">
            <FormattedDate value={orderAt} />
          </Text>
        </View>
      </View>
      <Divider my={8} />
      <View>
        <View flexDirection="row" justifyContent="space-between">
          <View>
            <TextPrice numberOfLines={1} size="3xl" value={orderAmount}></TextPrice>
            <TextPaymentStatus orderAmount={orderAmount} paymentAmount={paymentAmount} />
          </View>
          <View>
            <Button size="sm">
              <ButtonText>Hoá đơn</ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
