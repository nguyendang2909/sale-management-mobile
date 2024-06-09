import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useSaleOverall } from 'src/hooks';
import { navigate } from 'src/navigations';
import { ViewProps } from 'src/types';
import { timeUtil } from 'src/utils';

import { CardsOrderOverall } from './cards-order-overall';

export const OrderOverall: FC<
  ViewProps & {
    overall: {
      totalUnconfirmedOrders?: number;
      totalProcessingOrders?: number;
    };
  }
> = ({ overall, ...viewProps }) => {
  const { data: saleOverall } = useSaleOverall({
    startDate: timeUtil.getDate(),
    endDate: timeUtil.getDate(),
  });

  const handlePressAll = () => {
    navigate(SCREENS.HOME, {
      screen: HOME_SCREENS.ORDERS,
    });
  };

  return (
    <View {...viewProps}>
      <View px={16}>
        <HStack justifyContent="space-between">
          <View>
            <HStack alignItems="center">
              <Text>Đơn hàng</Text>
            </HStack>
          </View>
          <View>
            <TouchableOpacity onPress={handlePressAll}>
              <HStack alignItems="center">
                <View>
                  <Text>Tất cả</Text>
                </View>
                <View>
                  <Icon as={ChevronRight} />
                </View>
              </HStack>
            </TouchableOpacity>
          </View>
        </HStack>
      </View>

      <View px={16} mt={8}>
        <CardsOrderOverall overall={overall} />
      </View>
    </View>
  );
};
