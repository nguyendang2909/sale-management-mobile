import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps } from 'src/types';

export const ViewFooter: FC<ViewProps & { isShadow?: boolean }> = ({
  py,
  pt,
  pb,
  isShadow = true,
  ...viewProps
}) => {
  const inset = useSafeAreaInsets();

  return (
    <View
      bgColor="$white"
      {...(inset.bottom ? { pt: pt || py, pb: inset.bottom } : { py, pb })}
      {...(isShadow
        ? {
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }
        : {})}
      {...viewProps}
    ></View>
  );
};
