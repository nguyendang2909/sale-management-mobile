import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { useLazyFetchUnconfirmedOrdersQuery } from 'src/api';
import { ORDER_STATUSES } from 'src/constants';

import { ContentOrders } from '../content-orders';

export const OrderWaitToConfirmTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrders
          description="Chưa có đơn hàng chờ xác nhận"
          status={ORDER_STATUSES.UNCONFIRMED}
          lazyQuery={useLazyFetchUnconfirmedOrdersQuery}
          ActionComponent={
            <View flexDirection="row" justifyContent="center" alignItems="center">
              <Button>
                <ButtonText size="lg">Tạo đơn hàng</ButtonText>
              </Button>
            </View>
          }
        />
      </View>
    </>
  );
};
