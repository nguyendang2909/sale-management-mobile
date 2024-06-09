import { ScrollView, Text, View } from '@gluestack-ui/themed';

import { SaleOverall } from './sale-overall/sale-overall';

export const ContentManagement = () => {
  return (
    <>
      <ScrollView py={16}>
        <View>
          <View px={16}>
            <Text>Hôm nay</Text>
          </View>
          <SaleOverall />
        </View>
      </ScrollView>
    </>
  );
};
