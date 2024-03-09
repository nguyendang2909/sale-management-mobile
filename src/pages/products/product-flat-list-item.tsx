import { HStack, Icon, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { MaterialCommunityIcons } from 'src/components';
import { AppStore } from 'src/types';
import { priceUtil } from 'src/utils';

type FCProps = {
  product: AppStore.Product;
};

export const ProductFlatListItem: FC<FCProps> = ({ product }) => {
  const image = _.get(product, 'images[0]');
  const handlePress = () => {
    console.log(111);
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <View
            borderWidth={1}
            borderRadius={8}
            borderColor="$coolGray200"
            p={8}
            bg={pressed ? '$coolGray200' : '$white'}
            mx={8}
            mb={16}
          >
            <HStack columnGap={8}>
              <View>
                {image ? (
                  <></>
                ) : (
                  <View
                    height={64}
                    width={64}
                    borderRadius={8}
                    borderColor="$coolGray200"
                    borderWidth={1}
                    bgColor="$coolGray100"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={MaterialCommunityIcons}
                      name="food-outline"
                      color="$coolGray500"
                      size={28}
                    />
                  </View>
                )}
              </View>
              <VStack>
                <View height={22}>
                  <Text lineHeight={22} numberOfLines={1}>
                    {product.title}
                  </Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21}>{''}</Text>
                </View>
                <View height={21}>
                  <Text lineHeight={21} color="$red600">
                    {!!product.price && priceUtil.format(product.price)}
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
