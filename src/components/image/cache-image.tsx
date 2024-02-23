import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { mediaFileUtil } from 'src/utils/media-files.util';

type CacheImageProps = {
  url?: string;
  style?: StyleProp<ImageStyle>;
};

export const CacheImage: React.FC<CacheImageProps> = ({ url, style }) => {
  return (
    <FastImage
      style={style}
      source={{
        uri: mediaFileUtil.getUrl(url),
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
