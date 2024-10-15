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
import React, { FC, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import Toast from 'react-native-toast-message';
import { ProductPrices } from 'src/components/text/product-prices';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { cartActions } from 'src/store/cart';
import { AppStore, CartItemsObj, VariantsMap } from 'src/types';

type FCProps = {
  product: AppStore.Product;
  variantsMap: VariantsMap;
};

export const PickProduct: FC<FCProps> = ({ product, variantsMap }) => {
  const dispatch = useAppDispatch();
  const productAndVariantIds = useMemo(
    () =>
      product.variants?.map(variant => {
        return {
          variantId: variant.id,
          productId: product.id,
        };
      }) || [],
    [product.id, product.variants],
  );
  const firstVariantId = useMemo(() => productAndVariantIds[0].variantId, [productAndVariantIds]);
  const firstVariant = useMemo(() => variantsMap[firstVariantId], [firstVariantId, variantsMap]);
  const variantsLength = useMemo(() => product.variants?.length || 0, [product.variants]);
  const cartItemsObj: CartItemsObj = useAppSelector(s => {
    const itemsObj = s.cart.items;
    return productAndVariantIds.reduce<CartItemsObj>((result, productAndVariantId) => {
      return {
        ...result,
        [productAndVariantId.variantId]: itemsObj[productAndVariantId.variantId] || {
          quantity: 0,
          variantId: productAndVariantId.variantId,
          productId: productAndVariantId.productId,
        },
      };
    }, {});
  });
  const cartItems = Object.values(cartItemsObj);
  const quantity = cartItems.reduce((result, cartItem) => result + cartItem.quantity, 0);
  const imagePath = _.first(product.images);

  const handleAdd = useCallback(() => {
    if (variantsLength === 1) {
      if (firstVariant && firstVariantId && cartItemsObj[firstVariantId]) {
        if (!_.isNil(firstVariant.isInStock)) {
          if (!firstVariant.isInStock) {
            Toast.show({ text1: 'Sản phẩm hết hàng', type: 'error' });
            return;
          }
        } else if (
          !_.isUndefined(firstVariant.stock) &&
          (firstVariant.stock || 0) <= cartItemsObj[firstVariantId].quantity
        ) {
          Toast.show({ text1: 'Vượt quá số lượng sản phẩm tồn kho', type: 'error' });
          return;
        }
        dispatch(cartActions.addCartItem(productAndVariantIds[0]));
      }
    }
  }, [cartItemsObj, dispatch, firstVariant, firstVariantId, productAndVariantIds, variantsLength]);

  const handleSubtract = useCallback(() => {
    if (variantsLength === 1) {
      dispatch(cartActions.subtractCartItem(productAndVariantIds[0].variantId));
    }
  }, [dispatch, productAndVariantIds, variantsLength]);

  const handleSet = useCallback(
    (e: string) => {
      if (variantsLength === 1) {
        const eNumber = +e;
        if (_.isNumber(eNumber) && eNumber >= 0) {
          dispatch(
            cartActions.setCartItem({
              quantity: _.round(eNumber, 0),
              variantId: _.get(product, 'variant[0].id', ''),
              productId: product.id,
            }),
          );
        }
      }
    },
    [dispatch, product, variantsLength],
  );

  return (
    <Pressable as={TouchableHighlight} onPress={handleAdd}>
      <View bg="$white" px={16}>
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
                      value={quantity.toString()}
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
