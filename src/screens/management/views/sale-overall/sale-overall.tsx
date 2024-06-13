import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { navigate } from 'src/navigations';
import { ViewProps } from 'src/types';

import { CardsSaleOverall } from './cards-sale-overall';

export const SaleOverall: FC<
  ViewProps & {
    overall: {
      revenue?: number;
      totalOrders?: number;
    };
  }
> = ({ overall, ...viewProps }) => {
  const { isOpen: isShowOverall, onToggle } = useDisclose();

  const handlePressDetail = useCallback(() => {
    navigate(SCREENS.REPORTS_CHILD);
  }, []);

  return (
    <View {...viewProps}>
      <View px={16}>
        <HStack justifyContent="space-between">
          <View>
            <HStack alignItems="center">
              <Text>Hôm nay</Text>
              <TouchableOpacity onPress={onToggle}>
                <View px={8}>
                  <Icon as={isShowOverall ? Eye : EyeOff} size="lg" />
                </View>
              </TouchableOpacity>
            </HStack>
          </View>

          <View>
            <TouchableOpacity onPress={handlePressDetail}>
              <HStack alignItems="center">
                <View>
                  <Text color="$success400">Báo cáo</Text>
                </View>
                <View>
                  <Icon color="$success400" as={ChevronRight} />
                </View>
              </HStack>
            </TouchableOpacity>
          </View>
        </HStack>
      </View>
      <CardsSaleOverall
        isShow={isShowOverall}
        revenue={overall.revenue}
        totalOrders={overall.totalOrders}
      />
    </View>
  );
};
