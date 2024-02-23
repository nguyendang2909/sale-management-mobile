import { Box, Pressable, Text } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { CacheImage, LinearGradient } from 'src/components';
import { height, width } from 'src/styles';
import { Entity } from 'src/types';

type MatchCardItemProps = {
  match: Entity.Match;
  width: number;
  height: number;
  onPress: (e: Entity.Match) => void;
};

export const MatchCardItem: FC<MatchCardItemProps> = ({
  match,
  width: widthValue,
  height: heightValue,
  onPress,
}) => {
  const handlePress = useCallback(() => {
    onPress(match);
  }, [match, onPress]);

  const url = _.get(match, 'targetProfile.mediaFiles[0].key');

  return (
    <Pressable p={1} width={widthValue} onPress={handlePress}>
      <Box>
        <CacheImage
          style={[styles.image, height(heightValue), width(widthValue)]}
          url={url}
        ></CacheImage>
        <LinearGradient
          position="absolute"
          colors={['#fd267a', '#ff6036']}
          height={heightValue}
          width={widthValue}
          borderRadius={8}
        />
      </Box>
      <Box>
        <Text fontWeight="bold" numberOfLines={1}>
          {match.targetProfile?.nickname}
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    zIndex: 10,
  },
});
