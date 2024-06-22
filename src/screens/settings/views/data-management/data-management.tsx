import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

import { MenuItemDeleteAccount } from './menu-item/menu-item-delete-data';

export const DataManagement: FC<
  ViewProps & {
    isLoading: boolean;
    onDeleteAccount: () => Promise<void>;
  }
> = ({ onDeleteAccount, ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View px={16}>
        <Text bold={true} textTransform="uppercase" numberOfLines={1}>
          Dữ liệu
        </Text>
      </View>

      <View mt={8} bgColor="$white">
        {/* <MenuItemDeleteShop />
        <Divider /> */}
        <MenuItemDeleteAccount onDelete={onDeleteAccount} />
      </View>
    </View>
  );
};
