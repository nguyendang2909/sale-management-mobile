import {
  Avatar,
  AvatarFallbackText,
  Divider,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore } from 'src/types';

type FCProps = {
  customer: AppStore.Customer;
};

export const CustomerListItem: FC<FCProps> = ({ customer }) => {
  const handlePress = () => {};

  return (
    <>
      <Pressable onPress={handlePress}>
        {({ pressed }) => {
          return (
            <View bgColor="$white" py={16}>
              <HStack columnGap={8}>
                <View pl={16}>
                  <Avatar
                    height={40}
                    width={40}
                    bgColor="$secondary300"
                    size="md"
                    borderRadius="$full"
                  >
                    <AvatarFallbackText>{customer.fullName}</AvatarFallbackText>
                  </Avatar>
                </View>
                <VStack>
                  <Text lineHeight={20}>{customer.fullName}</Text>
                  <Text lineHeight={20} color="$secondary500" fontSize="$sm">
                    {customer.fullName}
                  </Text>
                </VStack>
              </HStack>
            </View>
          );
        }}
      </Pressable>
      <Divider />
    </>
  );
};
