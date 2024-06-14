import { Pressable, Text, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { BaseIcon, Card } from 'src/components';
import { navigate } from 'src/navigations';
import { NavigationCard } from 'src/types';

export const CardFeature: FC<{ data: NavigationCard }> = ({ data }) => {
  const handlePress = useCallback(() => {
    // @ts-ignore
    navigate(data.screen);
  }, [data.screen]);

  return (
    <Pressable w="$1/3" px={8} py={8} onPress={handlePress}>
      {/* @ts-ignore */}
      {({ pressed }) => (
        <Card flex={1} p={16} bgColor={pressed ? '$coolGray200' : '$white'}>
          <View justifyContent="center" alignItems="center">
            <BaseIcon size={32} icon={data.icon} />
          </View>
          <View mt={4}>
            <Text textAlign="center" size="xs" numberOfLines={1}>
              {data.title}
            </Text>
          </View>
        </Card>
      )}
    </Pressable>
  );
};
