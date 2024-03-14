import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { CategoryTab } from '../../products/tabs/category-tab';
import { CustomerTab } from './customer-tab';

const renderScene = SceneMap({
  customer: CustomerTab,
  customerGroup: CategoryTab,
});

export const CustomerTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'customer', title: 'Khách hàng' },
    { key: 'customerGroup', title: 'Nhóm khách hàng' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    ></TabView>
  );
};
