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
import { FormParams } from 'src/types';
import { productVariantUtil } from 'src/utils';

import { PickProduct } from './pick-product-list-item';

export const PickProducts: FC<{ values: FormParams.CreateOrder }> = ({ values }) => {
  const { data: products, isRefreshing, refresh } = useSearchProducts();
  const navigation = useNavigation();
  const cartItemsObj = useAppSelector(s => s.cart.items);
  const cartItems = useMemo(() => Object.values(cartItemsObj), [cartItemsObj]);

  const variantsMap = useMemo(() => productVariantUtil.getObjFromProducts(products), [products]);

  const { totalVariants, variantAmount } = useMemo(
    () => productVariantUtil.getTotalAndAmountByCartItems(cartItems, variantsMap),
    [cartItems, variantsMap],
  );

  const handlePressNext = () => {
    navigation.navigate(SCREENS.ORDER_CONFIRM, { values });
  };

  return (
    <View flex={1}>
      <FlashList
        refreshing={isRefreshing}
        onRefresh={refresh}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={products}
        keyExtractor={(item, index) => item.id || index.toString()}
        // extraData={{
        //   cartItems,
        // }}
        renderItem={({ item }) => {
          return <PickProduct product={item} variantsMap={variantsMap} />;
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100}></View>}
      ></FlashList>
      {!!totalVariants && (
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
                      {totalVariants > 99 ? '99+' : totalVariants}
                    </BadgeText>
                  </Badge>

                  <ButtonIcon as={ShoppingCart} />
                </View>
                <View flex={1}>
                  <ButtonText>
                    <Price value={variantAmount} />
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
