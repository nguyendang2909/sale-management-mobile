import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps } from 'src/types';

export const ViewFooter: FC<ViewProps> = ({ py, pb, ...viewProps }) => {
  const inset = useSafeAreaInsets();

  return <View {...(inset.bottom ? { pt: py } : { py, pb })} {...viewProps}></View>;
};
