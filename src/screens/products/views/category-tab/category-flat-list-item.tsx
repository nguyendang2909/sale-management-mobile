import { HStack, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { EmptyProductIconBox } from 'src/containers/icon/empty-product-icon-box';
import { AppStore } from 'src/types';

type FCProps = {
  category: AppStore.Category;
};

export const CategoryFlatListItem: FC<FCProps> = ({ category }) => {
  const image = _.get(category, 'images[0]');
  const handlePress = () => {};

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <View bg={pressed ? '$coolGray200' : '$white'} px={16}>
            <HStack columnGap={8} borderBottomWidth={1} borderColor="$coolGray200" py={8}>
              <View>{image ? <></> : <EmptyProductIconBox />}</View>
              <VStack>
                <View height={22}>
                  <Text lineHeight={22} numberOfLines={1}>
                    {category.title}
                  </Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21}>{''}</Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21} color="$red600">
                    0 sản phẩm
                  </Text>
                </View>
              </VStack>
            </HStack>
          </View>
        );
      }}
    </Pressable>
  );
};
