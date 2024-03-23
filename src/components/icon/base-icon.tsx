import { ImageBackground, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { ImageStyle, StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export const iconRegistry = {
  back: require('../../../assets/icons/back.png'),
  bell: require('../../../assets/icons/bell.png'),
  caretLeft: require('../../../assets/icons/caretLeft.png'),
  caretRight: require('../../../assets/icons/caretRight.png'),
  check: require('../../../assets/icons/check.png'),
  clap: require('../../../assets/icons/clap.png'),
  community: require('../../../assets/icons/community.png'),
  components: require('../../../assets/icons/components.png'),
  debug: require('../../../assets/icons/debug.png'),
  github: require('../../../assets/icons/github.png'),
  heart: require('../../../assets/icons/heart.png'),
  hidden: require('../../../assets/icons/hidden.png'),
  ladybug: require('../../../assets/icons/ladybug.png'),
  lock: require('../../../assets/icons/lock.png'),
  menu: require('../../../assets/icons/menu.png'),
  more: require('../../../assets/icons/more.png'),
  pin: require('../../../assets/icons/pin.png'),
  podcast: require('../../../assets/icons/podcast.png'),
  settings: require('../../../assets/icons/settings.png'),
  slack: require('../../../assets/icons/slack.png'),
  view: require('../../../assets/icons/view.png'),
  x: require('../../../assets/icons/x.png'),
};

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function BaseIcon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props;

  return (
    <View style={$containerStyleOverride}>
      {/* 
// @ts-ignore */}
      <ImageBackground
        style={[
          $imageStyle,
          // color && { tintColor: color },
          // size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </View>
  );
}

const $imageStyle: ImageStyle = {
  resizeMode: 'contain',
};
