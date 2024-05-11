import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

export const LoadingOverlay: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <>
      <View
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        bgColor="$blueGray100"
        opacity={0.4}
        zIndex={3}
      ></View>
      <View
        justifyContent="center"
        alignItems="center"
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        zIndex={4}
      >
        <ActivityIndicator />
      </View>
    </>
  );
};
