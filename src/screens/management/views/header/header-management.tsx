import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Header } from 'src/components';
import { AvatarShop } from 'src/components/avatar/avatar-shop';
import { SCREENS } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { navigate } from 'src/navigations';

export const HeaderManagement = () => {
  const shop = useAppSelector(s => s.app.shop);

  const handlePressShop = () => {
    navigate(SCREENS.SETTINGS);
  };

  return (
    <Header
      bgColor="$success900"
      LeftActionComponent={
        <View ml={16} pb={16}>
          <TouchableOpacity onPress={handlePressShop}>
            <HStack gap={8} alignItems="center">
              <View>
                <AvatarShop></AvatarShop>
              </View>
              <View>
                <View>
                  <Text bold color="$white">
                    {shop.title}
                  </Text>
                </View>
                <View>
                  <HStack alignItems="center">
                    <Text size="sm" color="$secondary300">
                      Thông tin
                    </Text>
                    <Icon color="$secondary300" as={ChevronRight} />
                  </HStack>
                </View>
              </View>
            </HStack>
          </TouchableOpacity>
        </View>
      }
      RightActionComponent={<View mr={16}>{/* <ProfileSettingIconButton /> */}</View>}
    />
  );
};
