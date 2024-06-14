import { Divider, Text, View } from '@gluestack-ui/themed';
import { Trash } from 'lucide-react-native';
import { FC } from 'react';
import { MenuItem } from 'src/components';
import { ViewProps } from 'src/types';

export const DataManagement: FC<ViewProps> = ({ ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View px={16}>
        <Text bold={true} textTransform="uppercase" numberOfLines={1}>
          Dữ liệu
        </Text>
      </View>

      <View mt={8} bgColor="$white">
        <Divider />
        <MenuItem
          leftIcon={Trash}
          title="Xoá cửa hàng"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            console.log(111);
          }}
        />
        <Divider />
        <MenuItem
          leftIcon={Trash}
          title="Xoá tài khoản"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            console.log(111);
          }}
        />
      </View>
    </View>
  );
};
