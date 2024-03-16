import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useWindowDimensions } from 'react-native';

import { CategoryTab } from './category-tab/category-tab';
import { ProductTab } from './product-tab/product-tab';

const Tab = createMaterialTopTabNavigator();

export const ProductTabs = () => {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator initialLayout={{ width: layout.width }}>
      <Tab.Screen name="Sản phẩm" component={ProductTab} />
      <Tab.Screen name="Danh mục" component={CategoryTab} />
    </Tab.Navigator>
  );
};
