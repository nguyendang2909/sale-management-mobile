import { Button, ButtonIcon, ButtonText, HStack, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import _ from 'lodash';
import { ShoppingCart } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useSearchProducts } from 'src/hooks';
import { AppStore } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { PickProduct } from './pick-product-list-item';

export const PickProducts = () => {
  const { data: products } = useSearchProducts();
  const [productItems, setProductItems] = useState<Record<string, number>>({});

  const objProducts: Record<string, AppStore.Product> = useMemo(
    () =>
      products.reduce((acc, product) => {
        return { ...acc, [product.id]: product };
      }, {}),
    [products],
  );

  const pickedProductCount = useMemo(
    () =>
      Object.entries(productItems).reduce((acc, productItem) => {
        return acc + productItem[1];
      }, 0),
    [productItems],
  );

  const pickedProductsPrice = useMemo(
    () =>
      Object.entries(productItems).reduce((acc, productItem) => {
        return objProducts[productItem[0]]
          ? acc + productUtil.getPriceWithQuantity(objProducts[productItem[0]])
          : 0;
      }, 0),
    [objProducts, productItems],
  );

  const handleAdd = useCallback(
    (productId: string) => {
      setProductItems(prev => {
        if (!objProducts[productId]) {
          return prev;
        }
        if (
          !_.isNil(objProducts[productId].inventory) &&
          objProducts[productId].inventory! <= (prev[productId] || 0)
        ) {
          Toast.show({ text1: 'Vượt quá số lượng sản phẩm tồn kho', type: 'error' });
          return prev;
        }
        if (!prev[productId]) {
          return { ...prev, [productId]: 1 };
        }
        return { ...prev, [productId]: prev[productId] + 1 };
      });
    },
    [objProducts],
  );

  const handleSubtract = useCallback((productId: string) => {
    setProductItems(prev => {
      if (!prev[productId]) {
        return prev;
      }
      if (prev[productId] === 1) {
        return _.omit(prev, productId);
      }
      return { ...prev, [productId]: prev[productId] - 1 };
    });
  }, []);

  const handleSet = useCallback((productId: string, quantity: number) => {
    setProductItems(prev => ({ ...prev, [productId]: quantity }));
  }, []);

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
      {!!pickedProductCount && (
        <View
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          bgColor="$white"
          as={SafeAreaView}
          // @ts-ignore
          edges={['bottom']}
          py={16}
          borderTopWidth={1}
          borderColor="$coolGray400"
        >
          <View px={16}>
            <Button size="lg">
              <HStack width="$full" alignItems="center" columnGap={16}>
                <View>
                  <ButtonIcon as={ShoppingCart} />
                </View>
                <View flex={1}>
                  <ButtonText>{pickedProductsPrice}</ButtonText>
                </View>
                <View>
                  <ButtonText>Tiếp tục</ButtonText>
                </View>
              </HStack>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
