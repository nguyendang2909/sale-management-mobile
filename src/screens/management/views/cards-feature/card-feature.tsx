import { Pressable, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { BaseIcon, Card } from 'src/components';
import { navigate } from 'src/navigations';
import { NavigationCard } from 'src/types';

export const CardFeature: FC<{ data: NavigationCard }> = ({ data }) => {
  const handlePress = () => {
    // @ts-ignore
    navigate(data.screen);
  };

  return (
    <Pressable
      $hover-bg="coolGray.200"
      $pressed-bg="coolGray.200"
      w="$1/3"
      px={8}
      py={8}
      onPress={handlePress}
    >
      <Card flex={1} p={16}>
        <View justifyContent="center" alignItems="center">
          <BaseIcon size={32} icon={data.icon} />
        </View>
        <View mt={4}>
          <Text textAlign="center" size="xs" numberOfLines={1}>
            {data.title}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};
