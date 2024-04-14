import { Text, View } from '@gluestack-ui/themed';
import { useFetchProductSettingsQuery } from 'src/api';
import { ORDER_SETTING_MENU } from 'src/constants/constants';

import { OrderSettingMenuItem } from './order-setting-menu-item';

export const OrderSettingContent = () => {
  useFetchProductSettingsQuery();

  return (
    <>
      {ORDER_SETTING_MENU.map(e => {
        return (
          <View key={e.id}>
            <View px={16} mt={16} mb={8}>
              <Text>{e.title}</Text>
            </View>
            <View px={16} bgColor="$white">
              {e.menu.map(menuItem => {
                return <OrderSettingMenuItem key={menuItem.id} menuItem={menuItem} />;
              })}
            </View>
          </View>
        );
      })}
    </>
  );
};
