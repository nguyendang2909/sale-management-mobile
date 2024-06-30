import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { ViewProps } from 'src/types';

import { CardsOrderOverall } from './cards-order-overall';

export const OrderOverall: FC<
  ViewProps & {
    overall: {
      totalUnconfirmedOrders?: number;
      totalProcessingOrders?: number;
    };
  }
> = ({ overall, ...viewProps }) => {
  const handlePressAll = () => {
    navigate(SCREENS.ORDERS_CHILD);
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
                  <Text color="$success400">Tất cả</Text>
                </View>
                <View>
                  <Icon color="$success400" as={ChevronRight} />
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
