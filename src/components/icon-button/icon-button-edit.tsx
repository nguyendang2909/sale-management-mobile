import { Icon, View } from '@gluestack-ui/themed';
import { PenLine } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'src/types';

export const IconButtonEdit: FC<
  ViewProps & {
    onPress?: () => void;
  }
> = ({ onPress, ...viewProps }) => {
  return (
    <View
      {...viewProps}
      as={TouchableOpacity}
      // @ts-ignore
      onPress={onPress}
    >
      <Icon color="$coolGray500" as={PenLine} size="lg" />
    </View>
  );
};
