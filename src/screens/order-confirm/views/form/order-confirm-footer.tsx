// import { Button, ButtonIcon, ButtonText, HStack, View } from '@gluestack-ui/themed';
// import { useNavigation } from '@react-navigation/native';
// import { Plus } from 'lucide-react-native';
// import { useCallback, useMemo } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';
// import { useCreateOrderMutation, useLazyFetchOrderQuery } from 'src/api';
// import { ORDER_STATUSES, SCREENS } from 'src/constants';
// import { useAppDispatch, useAppSelector, useMessages, useProducts } from 'src/hooks';
// import { navigate } from 'src/navigations';
// import { cartActions } from 'src/store/cart';
// import { AppStore } from 'src/types';

// import { ConfirmOrderPrices } from './confirm-order-prices';

// export const OrderConfirmFooter = () => {
//   const shopId = useAppSelector(s => s.app.shop.id);
//   const [fetchOrder] = useLazyFetchOrderQuery();
//   const { formatErrorMessage } = useMessages();
//   const navigation = useNavigation();
//   const dispatch = useAppDispatch();
//   const [createOrder] = useCreateOrderMutation();

//   const { data: products } = useProducts();
//   const cartItems = useAppSelector(s => s.cart.items);

//   const productsObj: Record<string, AppStore.Product> = useMemo(
//     () =>
//       products.reduce((acc, product) => {
//         return { ...acc, [product.id]: product };
//       }, {}),
//     [products],
//   );

//   const saveOrder = useCallback(async () => {
//     try {
//       const { data: createdOrder } = await createOrder({
//         shopId,
//         body: {
//           status: ORDER_STATUSES.PROCESSING,
//           items: Object.values(cartItems),
//         },
//       }).unwrap();
//       dispatch(cartActions.setCartItems({}));
//       const { data: fetchedOrder } = await fetchOrder(createdOrder.id);
//       if (fetchedOrder) {
//         navigate(SCREENS.INVOICE, {
//           order: fetchedOrder,
//         });
//       }
//     } catch (err) {
//       Toast.show({ text1: formatErrorMessage(err), type: 'error' });
//     }
//   }, [cartItems, createOrder, dispatch, fetchOrder, formatErrorMessage, shopId]);

//   return (
//     <>
//       <View
//         position="absolute"
//         left={0}
//         right={0}
//         bottom={0}
//         bgColor="$white"
//         as={SafeAreaView}
//         // @ts-ignore
//         edges={['bottom']}
//         pt={16}
//         borderTopWidth={1}
//         borderColor="$backgroundLight200"
//         px={16}
//       >
//         <View>
//           <ConfirmOrderPrices productsObj={productsObj} cartItems={cartItems} />
//         </View>
//         <View mt={16}>
//           <HStack columnGap={16} flex={1}>
//             <View flex={1}>
//               <Button variant="outline" onPress={saveOrder}>
//                 <ButtonIcon as={Plus}></ButtonIcon>
//                 <ButtonText>Lưu đơn</ButtonText>
//               </Button>
//             </View>

//             <View flex={1}>
//               <Button variant="solid">
//                 <ButtonIcon as={Plus}></ButtonIcon>
//                 <ButtonText>Thanh toán</ButtonText>
//               </Button>
//             </View>
//           </HStack>
//         </View>
//       </View>
//     </>
//   );
// };
