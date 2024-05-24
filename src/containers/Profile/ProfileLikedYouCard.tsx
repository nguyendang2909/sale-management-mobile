import { Text } from '@gluestack-ui/themed';
import { Center, Icon, Pressable, View, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useMessages } from 'src/hooks';

export const ProfileLikedYouCard: React.FC = () => {
  const { formatMessage } = useMessages();
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate('LikedMe');
  };

  return (
    <>
      <Pressable
        onPress={onPress}
        $hover-bg="$coolGray200"
        borderWidth={1}
        borderRadius={8}
        borderColor="$$coolGray200"
        py={16}
      >
        <VStack rowGap={4} columnGap={4}>
          <Center>
            <View>
              <Icon
                size={10}
                color="#DE685A"
                as={FontAwesome}
                // @ts-ignore
                name="heart"
              />
            </View>
          </Center>
          <Center>
            <Text>{formatMessage('Liked you')}</Text>
          </Center>
        </VStack>
      </Pressable>
    </>
  );
};
