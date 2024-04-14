import { Icon, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateProductSettingsMutation } from 'src/api';
import { SCREENS } from 'src/constants';
import { useAppDispatch, useMessages, useProductSettings } from 'src/hooks';
import { appActions } from 'src/store';
import { ApiRequest, AppStore } from 'src/types';

import { SelectProductSetting } from './select-product-setting';

export const SelectProductSettings: FC<{ product?: AppStore.Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();
  const navigation = useNavigation();
  const { data: settings } = useProductSettings();
  const [updateProductSettings] = useUpdateProductSettingsMutation();

  const handleUpdateProductSettings = useCallback(
    async (e: ApiRequest.UpdateProductSettings) => {
      try {
        await updateProductSettings(e).unwrap();
        dispatch(appActions.updateProductSettings(e));
      } catch (err) {
        Toast.show({
          text1: formatErrorMessage(err),
        });
      }
    },
    [dispatch, formatErrorMessage, updateProductSettings],
  );

  const handlePressSetting = () => {
    navigation.navigate(SCREENS.PRODUCT_SETTING);
  };

  return (
    <>
      <View flexDirection="row">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
            <View>
              <TouchableOpacity onPress={handlePressSetting}>
                <Icon as={Settings} size="lg" />
              </TouchableOpacity>
            </View>
            {!settings.showCreateProductImage && !product?.images?.length && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductImage"
                title="Ảnh sản phẩm"
              ></SelectProductSetting>
            )}

            {!settings.showCreateProductUnit && !product?.unit && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductUnit"
                title="Đơn vị sản phẩm"
              ></SelectProductSetting>
            )}
            {!settings.showCreateProductDescription && !product?.description && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductDescription"
                title="Mô tả sản phẩm"
              ></SelectProductSetting>
            )}
            {!settings.showCreateProductPromotionPrice && !product?.promotionalPrice && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductPromotionPrice"
                title="Giá khuyến mãi"
              ></SelectProductSetting>
            )}
            {!settings.showCreateProductWholesalePrice && !product?.wholesalePrice && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductWholesalePrice"
                title="Giá sỉ"
              ></SelectProductSetting>
            )}
            {!settings.showCreateProductTrackingStock && !product?.isTrackingStock && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductTrackingStock"
                title="Theo dõi tồn kho"
              ></SelectProductSetting>
            )}
            {!settings.showCreateProductBarcode && !product?.barcode && (
              <SelectProductSetting
                onPress={handleUpdateProductSettings}
                id="showCreateProductBarcode"
                title="Mã vạch"
              ></SelectProductSetting>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
