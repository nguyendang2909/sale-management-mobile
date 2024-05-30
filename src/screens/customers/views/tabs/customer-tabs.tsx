import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useWindowDimensions } from 'react-native';

import { CustomerGroupTab } from './customer-group-tab';
import { CustomerTab } from './customer-tab';

const Tab = createMaterialTopTabNavigator();

export const CustomerTabs = () => {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator initialLayout={{ width: layout.width }}>
      <Tab.Screen name="Khách hàng" component={CustomerTab} />
      <Tab.Screen name="Nhóm khách hàng" component={CustomerGroupTab} />
    </Tab.Navigator>
  );
};
