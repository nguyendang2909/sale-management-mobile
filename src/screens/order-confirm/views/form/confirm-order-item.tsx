import {
  Badge,
  BadgeIcon,
  CloseIcon,
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
import React, { FC, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { ProductPrices } from 'src/components/text/formatted-prices';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { PickedOrderItem, ProductWithQuantity } from 'src/types';

type FCProps = {
  orderItem: ProductWithQuantity;
  onAdd: (productId: string) => void;
  onSubtract: (productId: string) => void;
  onSet: (item: PickedOrderItem) => void;
  onDelete: (productId: string) => void;
};

export const ConfirmOrderItem: FC<FCProps> = ({
  orderItem,
  onAdd,
  onSubtract,
  onSet,
  onDelete,
}) => {
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

  const handleDelete = useCallback(() => {
    onDelete(productId);
  }, [onDelete, productId]);

  return (
    <Pressable as={TouchableHighlight} onPress={handleAdd}>
      <View bg="$white" px={16}>
        <HStack columnGap={8} borderBottomWidth={1} borderColor="$backgroundLight200" py={8}>
          <View height="$full" justifyContent="center" alignItems="center">
            <View>
              <Badge
                as={Pressable}
                // @ts-ignore
                onPress={handleDelete}
                position="absolute"
                left={-10}
                top={-10}
                height={20}
                width={20}
                px={0}
                py={0}
                borderRadius="$full"
                borderWidth={1}
                zIndex={999999999}
                variant="solid"
                alignSelf="flex-end"
                justifyContent="center"
                alignItems="center"
              >
                <BadgeIcon zIndex={99999} as={CloseIcon}></BadgeIcon>
              </Badge>
              <ProductIconBox url={imagePath?.path} size="lg" />
            </View>
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
                <ProductPrices product={orderItem} />
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
                <InputSlot as={Pressable} onPress={handleSubtract}>
                  <InputIcon as={MinusCircle} color="$primary500" />
                </InputSlot>
                <InputField
                  textAlign="center"
                  inputMode="numeric"
                  value={orderItem.quantity.toString()}
                  onChangeText={handleSet}
                  lineHeight={20}
                ></InputField>
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
