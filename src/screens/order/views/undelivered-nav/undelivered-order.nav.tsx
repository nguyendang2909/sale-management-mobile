import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

import { ButtonDeleteOrder } from './delete-order-button';

export const UndeliveredOrderNav: FC<
  ViewProps & {
    orderId: string;
  }
> = ({ orderId, ...viewProps }) => {
  return (
    <>
      <View {...viewProps}>
        <View flexDirection="row" columnGap={16}>
          <View flex={1}>
            <ButtonDeleteOrder orderId={orderId} />
          </View>
          <View flex={1}>
            {/* <Button onPress={handleConfirmDelivery}>
              <ButtonText>Đã giao</ButtonText>
            </Button> */}
          </View>
        </View>
      </View>
    </>
  );
};
