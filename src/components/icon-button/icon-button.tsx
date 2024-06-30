import { View } from '@gluestack-ui/themed';
import { FC, PropsWithChildren } from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'src/types';

export const IconButtonRounded: FC<ViewProps & PropsWithChildren & { onPress?: () => void }> = ({
  children,
  onPress,
  ...viewProps
}) => {
  return (
    <View
      p={8}
      as={TouchableOpacity}
      borderRadius={1000}
      borderWidth={1}
      height={40}
      width={40}
      borderColor="$coolGray200"
      justifyContent="center"
      alignItems="center"
      {...viewProps}
      //   @ts-ignore
      onPress={onPress}
    >
      {children}
    </View>
  );
};
