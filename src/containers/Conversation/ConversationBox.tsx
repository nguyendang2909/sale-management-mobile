import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, HStack, Pressable, Text } from 'native-base';
import React, { useCallback } from 'react';
import { Entity } from 'src/types/entities.type';
import { mediaFileUtil } from 'src/utils/media-files.util';

type FCProps = {
  data: Entity.Match;
};

export const ConversationBox: React.FC<FCProps> = ({ data }) => {
  const navigation = useNavigation();

  const isRead = data.read;

  const handlePress = useCallback(() => {
    navigation.navigate('Messages', {
      matchId: data._id,
      match: data,
    });
  }, [data, navigation]);

  return (
    <Pressable backgroundColor="#fff" onPress={handlePress}>
      {({ isPressed }) => {
        return (
          <Box px={4} py={2} bg={isPressed ? 'coolGray.200' : '#fff'}>
            <HStack space={4}>
              <Box>
                <Avatar
                  size={16}
                  source={{
                    uri: data.targetProfile?.mediaFiles?.length
                      ? mediaFileUtil.getUrl(data.targetProfile?.mediaFiles[0].key)
                      : undefined,
                  }}
                ></Avatar>
              </Box>
              <Box justifyContent="center">
                <Box>
                  <Text
                    color="black"
                    bold={!isRead}
                    fontSize={16}
                    numberOfLines={1}
                    marginRight={24}
                  >
                    {data.targetProfile?.nickname}
                  </Text>
                </Box>
                <Box>
                  <Text
                    flex={1}
                    bold={!isRead}
                    fontSize={14}
                    color="gray.700"
                    numberOfLines={1}
                    marginRight={24}
                  >
                    {data.lastMessage?.text}
                  </Text>
                </Box>
              </Box>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
