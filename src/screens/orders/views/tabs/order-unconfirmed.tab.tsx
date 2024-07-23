import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { useLazyFetchUnconfirmedOrdersQuery } from 'src/api';
import { ORDER_STATUSES_MAP } from 'src/constants';

import { ContentOrdersTab } from '../content-orders-tab';

export const OrderWaitToConfirmTab = () => {
  return (
    <>
      <View flex={1}>
        <ContentOrdersTab
          description="Chưa có đơn hàng chờ xác nhận"
          status={ORDER_STATUSES_MAP.UNCONFIRMED}
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
