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
import { SkuPrice } from 'src/components/text/sku-price';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { CartItem, Entity } from 'src/types';

type FCProps = {
  sku: Entity.Sku;
  // onAdd: (productId: string) => void;
  // onSubtract: (productId: string) => void;
  // onSet: (item: PickedOrderItem) => void;
  // onDelete: (productId: string) => void;
};

export const ConfirmOrderItem: FC<FCProps> = ({ sku }) => {
  const dispatch = useAppDispatch();
  const skuId = useMemo(() => sku.id, [sku.id]);
  const imagePath = _.first(sku.product?.images)?.path;
  const cartItem: CartItem = useAppSelector(
    e =>
      e.cart.items[skuId] || {
        quantity: 0,
        skuId,
      },
  );

  const handleAdd = useCallback(() => {
    // if (!_.isNil(sku.product?.isInStock)) {
    //   if (!sku.product.isInStock) {
    //     Toast.show({ text1: 'Sản phẩm hết hàng', type: 'error' });
    //     return;
    //   }
    // } else if (!_.isNil(sku.stock) && sku.stock <= cartItem.quantity) {
    //   Toast.show({ text1: 'Vượt quá số lượng sản phẩm tồn kho', type: 'error' });
    //   return;
    // }
    dispatch(cartActions.addCartItem(skuId));
  }, [cartItem.quantity, dispatch, sku.product?.isInStock, sku.stock, skuId]);

  const handleSubtract = useCallback(() => {
    dispatch(cartActions.subtractCartItem(skuId));
  }, [dispatch, skuId]);

  const handleSet = useCallback(
    (e: string) => {
      const eNumber = +e;
      if (_.isNumber(eNumber) && eNumber >= 0) {
        dispatch(cartActions.setCartItem({ skuId, quantity: _.round(eNumber, 0) }));
      }
    },
    [dispatch, skuId],
  );

  const handleDelete = useCallback(
    (productId: string) => {
      dispatch(cartActions.deleteCartItem(productId));
    },
    [dispatch],
  );

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
              <ProductIconBox url={imagePath} size="lg" />
            </View>
          </View>
          <VStack>
            <View height={22}>
              <Text lineHeight={22} numberOfLines={1}>
                {sku.product?.title}
              </Text>
            </View>
            <View height={21}>
              <Text lineHeight={21}>{''}</Text>
            </View>
            <View height={21}>
              <Text lineHeight={21} color="$red600">
                <SkuPrice sku={sku} />
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
                  value={cartItem.quantity.toString()}
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
