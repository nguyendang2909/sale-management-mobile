import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { CategoryTab } from './category-tab';
import { ProductTab } from './product-tab';

const renderScene = SceneMap({
  product: ProductTab,
  second: CategoryTab,
});

export const ProductTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'product', title: 'Sản phẩm' },
    { key: 'second', title: 'Danh mục' },
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
