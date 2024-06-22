// import { Icon, ScrollView, View } from '@gluestack-ui/themed';
// import { useNavigation } from '@react-navigation/native';
// import { Settings } from 'lucide-react-native';
// import { FC, useCallback } from 'react';
// import { TouchableOpacity } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { useUpdateProductSettingsMutation } from 'src/api';
// import { SCREENS } from 'src/constants';
// import { useAppDispatch, useMessages, useProductSettings } from 'src/hooks';
// import { appActions } from 'src/store';
// import { ApiRequest, AppStore } from 'src/types';

// import { SelectProductSetting } from './select-product-setting';

// export const SelectProductSettings: FC<{ product?: AppStore.Product }> = ({ product }) => {
//   const dispatch = useAppDispatch();
//   const { formatErrorMessage } = useMessages();
//   const navigation = useNavigation();
//   const { data: settings } = useProductSettings();
//   const [updateProductSettings] = useUpdateProductSettingsMutation();

//   const handleUpdateProductSettings = useCallback(
//     async (e: ApiRequest.UpdateProductSettings) => {
//       try {
//         await updateProductSettings(e).unwrap();
//         dispatch(appActions.updateProductSettings(e));
//       } catch (err) {
//         Toast.show({
//           text1: formatErrorMessage(err),
//         });
//       }
//     },
//     [dispatch, formatErrorMessage, updateProductSettings],
//   );

//   const handlePressSetting = () => {
//     navigation.navigate(SCREENS.PRODUCT_SETTING);
//   };

//   return (
//     <>
//       <View flexDirection="row">
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//           <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
//             <View>
//               <TouchableOpacity onPress={handlePressSetting}>
//                 <Icon as={Settings} size="lg" />
//               </TouchableOpacity>
//             </View>
//             {!settings.showImage && !product?.images?.length && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showImage"
//                 title="Ảnh sản phẩm"
//               ></SelectProductSetting>
//             )}

//             {!settings.showUnit && !product?.unit && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showUnit"
//                 title="Đơn vị sản phẩm"
//               ></SelectProductSetting>
//             )}
//             {!settings.showDescription && !product?.description && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showDescription"
//                 title="Mô tả sản phẩm"
//               ></SelectProductSetting>
//             )}
//             {!settings.showPromotionalPrice && !product?.promotionalPrice && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showPromotionalPrice"
//                 title="Giá khuyến mãi"
//               ></SelectProductSetting>
//             )}
//             {!settings.showWholesalePrice && !product?.wholesalePrice && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showWholesalePrice"
//                 title="Giá sỉ"
//               ></SelectProductSetting>
//             )}
//             {!settings.showTrackingStock && product?.isInStock === null && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showTrackingStock"
//                 title="Theo dõi tồn kho"
//               ></SelectProductSetting>
//             )}
//             {/* {!settings.showBarcode && !product?.barcode && (
//               <SelectProductSetting
//                 onPress={handleUpdateProductSettings}
//                 id="showBarcode"
//                 title="Mã vạch"
//               ></SelectProductSetting>
//             )} */}
//           </View>
//         </ScrollView>
//       </View>
//     </>
//   );
// };
