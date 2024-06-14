import { Text, View } from '@gluestack-ui/themed';
import { Info } from 'lucide-react-native';
import { FC } from 'react';
import { MenuItem } from 'src/components';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { ViewProps } from 'src/types';

export const ProductManagement: FC<ViewProps> = ({ ...viewProps }) => {
  return (
    <View {...viewProps}>
      <View px={16}>
        <Text bold={true} textTransform="uppercase" numberOfLines={1}>
          Sản phẩm
        </Text>
      </View>

      <View mt={8} bgColor="$white">
        <MenuItem
          leftIcon={Info}
          title="Cài đặt sản phẩm"
          // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
          onPress={() => {
            navigate(SCREENS.PRODUCT_SETTING);
          }}
          isNavigation
        />
      </View>
    </View>
  );
};
