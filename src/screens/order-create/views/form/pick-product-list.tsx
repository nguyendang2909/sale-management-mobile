import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  View,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ShoppingCart } from 'lucide-react-native';
import { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Price } from 'src/components/text/formatted-price';
import { SCREENS } from 'src/constants';
import { useAppSelector, useSearchProducts } from 'src/hooks';
import { AppStore, FormParams } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { PickProduct } from './pick-product-list-item';

export const PickProducts: FC<{ values: FormParams.CreateOrder }> = ({ values }) => {
  const {
    data: products,
    refetch: refetchProducts,
    isFetching: isFetchingProducts,
  } = useSearchProducts();
  const cartItems = useAppSelector(s => s.cart.items);
  const orderItems = useMemo(() => Object.values(cartItems), [cartItems]);
  const navigation = useNavigation();

  const objProducts: Record<string, AppStore.Product> = useMemo(
    () =>
      products.reduce((acc, product) => {
        return { ...acc, [product.id]: product };
      }, {}),
    [products],
  );

  const { productsTotal, productsTotalAmount } = useMemo(
    () =>
      orderItems.reduce<{ productsTotal: number; productsTotalAmount: number }>(
        (result, orderItem) => {
          return {
            productsTotal: result.productsTotal + orderItem.quantity,
            productsTotalAmount:
              result.productsTotalAmount +
              (objProducts[orderItem.productId]
                ? productUtil.getTotalAmountByOrderItem(objProducts[orderItem.productId], orderItem)
                : 0),
          };
        },
        {
          productsTotal: 0,
          productsTotalAmount: 0,
        },
      ),
    [objProducts, orderItems],
  );

  const handlePressNext = () => {
    navigation.navigate(SCREENS.ORDER_CONFIRM, { values });
  };

  return (
    <View flex={1}>
      <FlashList
        refreshing={isFetchingProducts}
        onRefresh={refetchProducts}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={products}
        keyExtractor={(item, index) => item.id || index.toString()}
        // extraData={{
        //   cartItems,
        // }}
        renderItem={({ item }) => {
          return <PickProduct product={item} />;
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
      {!!productsTotal && (
        <View
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          bgColor="$white"
          as={SafeAreaView}
          // @ts-ignore
          edges={['bottom']}
          pt={16}
          borderTopWidth={1}
          borderColor="$coolGray200"
        >
          <View px={16}>
            <Button size="lg" onPress={handlePressNext} height={56}>
              <HStack width="$full" alignItems="center" justifyContent="center" columnGap={24}>
                <View justifyContent="center" alignItems="center">
                  <Badge
                    position="absolute"
                    right={-10}
                    top={-10}
                    height={20}
                    width={20}
                    px={0}
                    py={0}
                    bg="$red600"
                    borderRadius="$full"
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <BadgeText color="$white" size="2xs">
                      {productsTotal > 99 ? '99+' : productsTotal}
                    </BadgeText>
                  </Badge>

                  <ButtonIcon as={ShoppingCart} />
                </View>
                <View flex={1}>
                  <ButtonText>
                    <Price value={productsTotalAmount} />
                  </ButtonText>
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
