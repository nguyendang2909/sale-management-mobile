import { Text, View } from '@gluestack-ui/themed';
import { Info } from 'lucide-react-native';
import { FC } from 'react';
import { MenuItem } from 'src/components';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { ViewProps } from 'src/types';

export const ShopManagement: FC<ViewProps> = ({ ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View px={16}>
        <Text bold={true} textTransform="uppercase" numberOfLines={1}>
          Cửa hàng
        </Text>
      </View>

      <View mt={8} bgColor="$white">
        <MenuItem
          leftIcon={Info}
          title="Thông tin cửa hàng"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            navigate(SCREENS.SHOP);
          }}
          isNavigation
        />
        {/* <Divider />
        <MenuItem
          leftIcon={CreditCard}
          title="Phương thức thanh toán"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            console.log(111);
          }}
          isNavigation
        /> */}
        {/* <Divider />
        <MenuItem
          leftIcon={List}
          title="Danh sách cửa hàng"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            console.log(111);
          }}
        /> */}
      </View>
    </View>
  );
};
