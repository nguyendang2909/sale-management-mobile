import { Text, View } from '@gluestack-ui/themed';
import { useFetchSettingsQuery } from 'src/api';
import { PRODUCT_SETTING_MENU } from 'src/constants/constants';

import { ProductSettingMenuItem } from './product-setting-menu-item';

export const ProductSettingContent = () => {
  useFetchSettingsQuery();

  return (
    <>
      {PRODUCT_SETTING_MENU.map(e => {
        return (
          <View key={e.id}>
            <View px={16} mt={16} mb={8}>
              <Text>{e.title}</Text>
            </View>
            <View px={16} bgColor="$white">
              {e.menu.map(menuItem => {
                return <ProductSettingMenuItem key={menuItem.id} menuItem={menuItem} />;
              })}
            </View>
          </View>
        );
      })}
    </>
  );
};
