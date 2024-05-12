import { HStack, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC } from 'react';
import { ProductPrices } from 'src/components/text/product-prices';
import { SCREENS } from 'src/constants';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { AppStore } from 'src/types';

type FCProps = {
  product: AppStore.Product;
};

export const ProductListItem: FC<FCProps> = ({ product }) => {
  const imagePath = _.first(product.images);

  const navigation = useNavigation();
  const handlePress = () => {
    console.log(111);
    navigation.navigate(SCREENS.PRODUCT, { detail: product });
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <View bg={pressed ? '$backgroundLight200' : '$white'} px={16}>
            <HStack columnGap={8} borderBottomWidth={1} borderColor="$backgroundLight200" py={8}>
              <View>
                <ProductIconBox url={imagePath?.path} />
              </View>
              <VStack>
                <View height={22}>
                  <Text lineHeight={22} numberOfLines={1}>
                    {product.title}
                  </Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21}>{''}</Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21}>
                    <ProductPrices product={product} />
                  </Text>
                </View>
              </VStack>
            </HStack>
          </View>
        );
      }}
    </Pressable>
  );
};
