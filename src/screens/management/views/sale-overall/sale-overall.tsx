import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { Eye, EyeOff } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useDisclose, useSaleOverall } from 'src/hooks';
import { timeUtil } from 'src/utils';

import { CardsSaleOverall } from './cards-sale-overall';
export const SaleOverall = () => {
  const { isOpen: isShowOverall, onToggle } = useDisclose();
  const { data: saleOverall } = useSaleOverall({
    startDate: timeUtil.getDate(),
    endDate: timeUtil.getDate(),
  });

  return (
    <>
      <HStack px={16} alignItems="center">
        <Text>Hôm nay</Text>
        <View ml={8}>
          <TouchableOpacity onPress={onToggle}>
            <Icon as={isShowOverall ? Eye : EyeOff} size="lg" />
          </TouchableOpacity>
        </View>
      </HStack>
      <CardsSaleOverall
        isShow={isShowOverall}
        revenue={saleOverall?.data.revenue}
        totalOrders={saleOverall?.data.totalOrders}
      />
    </>
  );
};
