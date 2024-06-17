import { FC, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Tab, TabBarExtra } from 'src/components/tab';
import { useAppDispatch } from 'src/hooks';
import { setSearchProducts } from 'src/store/cache';

import { CategoryTab } from './category-tab/category-tab';
import { CategoryTabHeader } from './headers/CategoryTabHeader';
import { ProductTabHeader } from './headers/ProductTabHeader';
import { ProductTab } from './product-tab/product-tab';

export const ProductTabs: FC<{ allowBack?: boolean }> = ({ allowBack }) => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchProducts(false));
  }, [dispatch]);

  return (
    <>
      <Tab.Navigator
        initialLayout={{ width: layout.width }}
        tabBar={props => {
          return (
            <TabBarExtra
              {...props}
              headers={[
                <ProductTabHeader key="product" allowBack={allowBack} />,
                <CategoryTabHeader key="category" allowBack={allowBack} />,
              ]}
            />
          );
        }}
      >
        <Tab.Screen name="product" component={ProductTab} options={{ tabBarLabel: 'Sản phẩm' }} />
        <Tab.Screen name="category" component={CategoryTab} options={{ tabBarLabel: 'Danh mục' }} />
      </Tab.Navigator>
    </>
  );
};
