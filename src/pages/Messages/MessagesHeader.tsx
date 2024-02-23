import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BackIconButton } from 'src/containers/IconButton/BackIconButton';
import { AppStore, Entity } from 'src/types';
import { mediaFileUtil } from 'src/utils';

import { MessagesSetting } from './MessagesSetting';

export type FCProps = {
  match: AppStore.Match | Entity.Match;
};
export const MessagesHeader: React.FC<FCProps> = ({ match }) => {
  const navigation = useNavigation();

  const handlePressProfile = () => {
    if (match?.targetProfile) {
      navigation.navigate('ChatProfile', { profile: match.targetProfile });
    }
  };

  return (
    <>
      <View h={56} flexDirection="row" alignItems="center" justifyContent="space-between">
        <HStack columnGap={8} justifyContent="center" alignItems="center">
          <BackIconButton />

          <TouchableOpacity onPress={handlePressProfile}>
            <HStack columnGap={8}>
              <View pointerEvents="none">
                <Avatar height={40} width={40}>
                  <AvatarFallbackText>{match?.targetProfile?.nickname}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: match?.targetProfile?.mediaFiles?.length
                        ? mediaFileUtil.getUrl(match.targetProfile?.mediaFiles[0].key)
                        : undefined,
                    }}
                  />
                  <AvatarBadge />
                </Avatar>
              </View>
              <VStack>
                <View>
                  <Text fontWeight="$bold" fontSize={16}>
                    {match?.targetProfile?.nickname}
                  </Text>
                </View>
                <View>
                  <Text fontSize={14}>{match?.targetProfile?.age}</Text>
                </View>
              </VStack>
            </HStack>
          </TouchableOpacity>
        </HStack>
        <Box pr={16}>
          <MessagesSetting matchId={match._id} />
        </Box>
      </View>
    </>
  );
};
