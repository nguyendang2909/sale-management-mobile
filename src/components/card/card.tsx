import { View } from '@gluestack-ui/themed';
import { FC, ReactNode } from 'react';
import { ViewProps } from 'src/types';

export const Card: FC<ViewProps & { children?: ReactNode }> = ({ children, ...viewProps }) => {
  return (
    <View
      bgColor="$white"
      borderRadius={8}
      shadowOffset={{
        width: 0,
        height: 1,
      }}
      shadowOpacity={0.25}
      shadowRadius={3}
      elevation={3}
      {...viewProps}
    >
      {children}
    </View>
  );
};
