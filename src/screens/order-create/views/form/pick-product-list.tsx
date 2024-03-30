import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useSearchProducts } from 'src/hooks';

import { PickProduct } from './pick-product-list-item';

export const PickProducts = () => {
  const { data: products } = useSearchProducts();
  const [productItems, setProductItems] = useState<Record<string, number>>({});

  const handleAdd = useCallback((productId: string) => {
    // console.log(111, productId);
    setProductItems(prev => {
      if (!prev[productId]) {
        return { ...prev, [productId]: 1 };
      }

      return { ...prev, [productId]: prev[productId] + 1 };
    });
  }, []);

  const handleSubtract = useCallback((productId: string) => {
    setProductItems(prev => {
      if (!prev[productId]) {
        return prev;
      }
      if (prev[productId] === 1) {
        return _.omit(prev, 'productId');
      }
      return { ...prev, [productId]: prev[productId] + 1 };
    });
  }, []);

  const handleSet = useCallback((productId: string, quantity: number) => {
    setProductItems(prev => ({ ...prev, [productId]: quantity }));
  }, []);

  console.log(111, productItems);

  return (
    <View flex={1}>
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={products}
        keyExtractor={(item, index) => item.id || index.toString()}
        extraData={{
          a: 1,
        }}
        renderItem={({ item }) => {
          console.log(11, productItems[item.id]);
          return (
            <PickProduct
              product={item}
              onAdd={handleAdd}
              onSubtract={handleSubtract}
              onSet={handleSet}
              quantity={productItems[item.id]}
            />
          );
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
    </View>
  );
};
