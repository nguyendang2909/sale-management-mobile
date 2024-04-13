import {
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import { MinusCircle, PlusCircle } from 'lucide-react-native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { ProductPrices } from 'src/components/text/formatted-prices';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { AppStore, PickedOrderItem } from 'src/types';

type FCProps = {
  product: AppStore.Product;
  quantity?: number;
  onAdd: (productId: string) => void;
  onSubtract: (productId: string) => void;
  onSet: (item: PickedOrderItem) => void;
};

export const PickProduct: FC<FCProps> = ({ product, quantity, onAdd, onSubtract, onSet }) => {
  const imagePath = _.first(product.imagePaths);
  const productId = useMemo(() => product.id, [product.id]);

  const handleAdd = useCallback(() => {
    onAdd(productId);
  }, [onAdd, productId]);

  const handleSubtract = useCallback(() => {
    onSubtract(productId);
  }, [onSubtract, productId]);

  const handleSet = useCallback(
    (e: string) => {
      if (_.isNumber(+e)) {
        onSet({ productId, quantity: +e });
      }
    },
    [onSet, productId],
  );

  return (
    <Pressable as={TouchableHighlight} onPress={handleAdd}>
      <View bg="$white" px={16}>
        <HStack columnGap={8} borderBottomWidth={1} borderColor="$coolGray200" py={8}>
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
        <View position="absolute" right={0} bottom={0}>
          <View pr={16} pb={8}>
            <HStack
              justifyContent="center"
              alignItems="center"
              rowGap={4}
              columnGap={4}
              height={40}
            >
              <Input
                variant="underlined"
                width={80}
                alignItems="center"
                justifyContent="flex-end"
                borderBottomWidth={0}
              >
                {!!quantity && (
                  <>
                    <InputSlot as={Pressable} onPress={handleSubtract}>
                      <InputIcon as={MinusCircle} color="$primary500" />
                    </InputSlot>
                    <InputField
                      textAlign="center"
                      inputMode="numeric"
                      value={quantity?.toString()}
                      onChangeText={handleSet}
                      lineHeight={20}
                    ></InputField>
                  </>
                )}
                <InputSlot onPress={handleAdd}>
                  <InputIcon as={PlusCircle} color="$primary500" />
                </InputSlot>
              </Input>
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
