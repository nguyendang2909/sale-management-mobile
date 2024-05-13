import { Button, ButtonText, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeleteOrderMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { ORDER_UNDELIVERED_STATUS_ARR, SCREENS } from 'src/constants';
import { Entity, ViewProps } from 'src/types';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderOverviewSection } from './overview/order-overview-section';
import { OrderPaymentSection } from './price/order-detail-price-section';

export const OrderContent: FC<ViewProps & { order: Entity.Order; isFetchingOrder: boolean }> = ({
  order,
  isFetchingOrder,
  ...viewProps
}) => {
  const navigation = useNavigation();

  const [deleteOrder, { isLoading: isDeleteOrderLoading }] = useDeleteOrderMutation();

  const handleConfirmDelivery = () => {
    navigation.navigate(SCREENS.ORDER_PAYMENT, { order });
  };

  return (
    <View {...viewProps} flex={1}>
      <LoadingOverlay isLoading={isFetchingOrder || isDeleteOrderLoading} />
      <ScrollView flex={1}>
        <OrderOverviewSection order={order} bg={'$white'} p={16} />
        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}
        <OrderPaymentSection order={order} bg={'$white'} p={16} mt={16} />
        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />
      </ScrollView>

      {_.includes(ORDER_UNDELIVERED_STATUS_ARR, order.status) && (
        <View
          px={16}
          pt={16}
          bgColor="white"
          as={SafeAreaView}
          // @ts-ignore
          edges={['bottom']}
        >
          <View flexDirection="row" columnGap={16}>
            <View flex={1}>
              <Button variant="outline" disabled={isDeleteOrderLoading}>
                <ButtonText>Huỷ</ButtonText>
              </Button>
            </View>
            <View flex={1}>
              <Button onPress={handleConfirmDelivery}>
                <ButtonText>Đã giao</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
