import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CacheImage } from 'src/components';
import { sizeUtil } from 'src/utils/box-size.util';

import { EmptyProductIcon } from './empty-product-icon';

type FCprops = ComponentProps<typeof View> & { size?: 'xl' | 'md' | 'lg'; url?: string };

export const ProductIconBox: FC<FCprops> = ({ url, size, ...props }) => {
  return (
    <View {...sizeUtil.getProps(size)}>
      <View
        zIndex={1}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        {...props}
        {...sizeUtil.getProps(size)}
        borderRadius={props.borderRadius || 4}
        borderColor={props.borderColor || '$backgroundLight200'}
        borderWidth={props.borderWidth || 1}
        bgColor={props.bgColor || '$coolGray100'}
        alignItems={props.alignItems || 'center'}
        justifyContent={props.justifyContent || 'center'}
      >
        <EmptyProductIcon size="xl" />
      </View>

      {!!url && (
        <View zIndex={10}>
          <CacheImage
            style={style.image}
            url={url}
            resizeMode={FastImage.resizeMode.cover}
          ></CacheImage>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    // aspectRatio: 640 / 860,
    // borderRadius: 8,
    height: '100%',
    width: '100%',
    // height: 500,
  },
});
