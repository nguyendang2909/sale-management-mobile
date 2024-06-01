import { Icon, View } from '@gluestack-ui/themed';
import { Trash2 } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'src/types';

export const IconButtonDelete: FC<
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
      <Icon color="$coolGray500" as={Trash2} size="xl" />
    </View>
  );
};
