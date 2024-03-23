import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';
import { mediaFileUtil } from 'src/utils/media-files.util';

type CacheImageProps = {
  url?: string;
  style: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
};

export const CacheImage: React.FC<CacheImageProps> = ({ url, style, resizeMode }) => {
  const uri = mediaFileUtil.getUrl(url);

  return (
    <FastImage
      style={style}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      // resizeMode={FastImage.resizeMode.contain}
      resizeMode={resizeMode}
    />
  );
};
