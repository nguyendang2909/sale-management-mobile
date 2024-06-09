import { ScrollView, View } from '@gluestack-ui/themed';

import { SaleOverall } from './sale-overall/sale-overall';

export const ContentManagement = () => {
  return (
    <>
      <ScrollView py={16}>
        <View>
          <SaleOverall />
        </View>
      </ScrollView>
    </>
  );
};
