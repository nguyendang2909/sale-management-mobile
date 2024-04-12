import {
  HStack,
  Icon,
  Input,
  InputField,
  Pressable,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import { MinusCircle, PlusCircle } from 'lucide-react-native';
import React, { FC, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { PickedOrderItem, ProductWithQuantity } from 'src/types';
import { priceUtil } from 'src/utils';

type FCProps = {
  orderItem: ProductWithQuantity;
  onAdd: (productId: string) => void;
  onSubtract: (productId: string) => void;
  onSet: (item: PickedOrderItem) => void;
};

export const ConfirmOrderItem: FC<FCProps> = ({ orderItem, onAdd, onSubtract, onSet }) => {
  const imagePath = _.first(orderItem.imagePaths);
  const productId = useMemo(() => orderItem.id, [orderItem.id]);

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
                {orderItem.title}
              </Text>
            </View>
            <View height={21}>
              <Text lineHeight={21}>{''}</Text>
            </View>
            <View height={21}>
              <Text lineHeight={21} color="$red600">
                {!!orderItem.price && priceUtil.format(orderItem.price)}
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
              {!!orderItem.quantity && (
                <>
                  <Pressable onPress={handleSubtract}>
                    <Icon as={MinusCircle} color="$primary500" />
                  </Pressable>
                  <Input variant="underlined">
                    <InputField
                      inputMode="numeric"
                      value={orderItem.quantity.toString()}
                      onChangeText={handleSet}
                    ></InputField>
                  </Input>
                  <Text>{orderItem.quantity}</Text>
                </>
              )}
              <Icon as={PlusCircle} color="$primary500" />
            </HStack>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
