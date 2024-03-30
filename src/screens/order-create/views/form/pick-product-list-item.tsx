import { HStack, Icon, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import _ from 'lodash';
import { MinusCircle, PlusCircle } from 'lucide-react-native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { AppStore } from 'src/types';
import { priceUtil } from 'src/utils';

type FCProps = {
  product: AppStore.Product;
  quantity?: number;
  onAdd: (productId: string) => void;
  onSubtract: (productId: string) => void;
  onSet: (productId: string, quantity: number) => void;
};

export const PickProduct: FC<FCProps> = ({ product, quantity, onAdd, onSubtract, onSet }) => {
  const imagePath = _.first(product.imagePaths);
  const productId = useMemo(() => product.id, [product.id]);
  // console.log(product.imagePaths);

  const handleAdd = useCallback(() => {
    onAdd(productId);
  }, [onAdd, productId]);

  const handleSubtract = useCallback(() => {
    onSubtract(productId);
  }, [onSubtract, productId]);

  const handleSet = useCallback(
    (e: string) => {
      if (_.isNumber(+e)) {
        onSet(productId, +e);
      }
    },
    [onSet, productId],
  );

  return (
    <Pressable as={TouchableHighlight} onPress={handleAdd}>
      <View bg="$white" px={16}>
        <HStack columnGap={8} borderBottomWidth={1} borderColor="$coolGray200" py={8}>
          <View>
            <ProductIconBox url={imagePath} />
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
              <Text lineHeight={21} color="$red600">
                {!!product.price && priceUtil.format(product.price)}
              </Text>
            </View>
          </VStack>
        </HStack>
        <View position="absolute" right={0} bottom={0}>
          <View pr={16} pb={8}>
            <HStack>
              <Pressable onPress={handleSubtract}>
                <Icon as={MinusCircle} />
              </Pressable>
              <Text>{quantity}</Text>

              <Icon as={PlusCircle} />
            </HStack>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const PickProductMemo = memo(PickProduct, (prevProps, nextProps) => {
  return (
    prevProps.quantity !== nextProps.quantity || !_.isEqual(prevProps.product, nextProps.product)
  );
});
