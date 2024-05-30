import { View } from '@gluestack-ui/themed';

import { CustomerList } from '../list/customer-list';

export const CustomerTab = () => {
  return (
    <View my={16} flex={1}>
      <CustomerList />
    </View>
  );
};
