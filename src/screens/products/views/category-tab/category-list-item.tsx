import { HStack, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC } from 'react';
import { SCREENS } from 'src/constants';
import { EmptyProductIconBox } from 'src/containers/icon/empty-product-icon-box';
import { AppStore } from 'src/types';

type FCProps = {
  category: AppStore.Category;
};

export const CategoryListItem: FC<FCProps> = ({ category }) => {
  const navigation = useNavigation();
  const image = _.get(category, 'images[0]');

  const handlePress = () => {
    navigation.navigate(SCREENS.CATEGORY, {
      detail: category,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <>
            <View bg={pressed ? '$backgroundLight200' : '$white'} px={16}>
              <HStack columnGap={8} borderBottomWidth={1} borderColor="$backgroundLight200" py={8}>
                <View>{image ? <></> : <EmptyProductIconBox />}</View>
                <VStack flex={1}>
                  <View height={32}>
                    <Text lineHeight={32} numberOfLines={1}>
                      {category.title}
                    </Text>
                  </View>
                  <View height={32}>
                    <Text lineHeight={32} color="$secondary500" fontSize={14} numberOfLines={1}>
                      {category.totalProducts} sản phẩm
                    </Text>
                  </View>
                </VStack>
              </HStack>
            </View>
          </>
        );
      }}
    </Pressable>
  );
};
