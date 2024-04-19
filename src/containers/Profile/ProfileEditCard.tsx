import { Center, Icon, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MaterialIcons } from 'src/components';
import { useMessages } from 'src/hooks';

export const ProfileEditCard: React.FC = () => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();
  const onPress = () => {
    navigate('ProfileEdit');
  };

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => {
        return (
          <View
            borderWidth={1}
            borderRadius={8}
            borderColor="$backgroundLight200"
            py={16}
            bg={pressed ? '$backgroundLight200' : undefined}
          >
            <VStack space="sm">
              <Center>
                <View>
                  <Icon
                    sx={{
                      fontSize: 30,
                      height: 30,
                      width: 30,
                    }}
                    as={MaterialIcons}
                    // @ts-ignore
                    name="account-circle"
                    color="#DE685A"
                  />
                </View>
              </Center>
              <Center>
                <Text>{formatMessage('Profile')}</Text>
              </Center>
            </VStack>
          </View>
        );
      }}
    </Pressable>
  );
};
