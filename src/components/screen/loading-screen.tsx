import { View } from '@gluestack-ui/themed';
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';

interface ILoadingScreen {
  isLoading?: boolean;
}

export const LoadingScreen: React.FC<ILoadingScreen> = ({ isLoading }) => {
  return (
    <Modal visible={isLoading} animationType="none" transparent={true}>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        // bgColor="$blueGray100"
        // opacity={0.4}
      >
        <ActivityIndicator />
      </View>
    </Modal>
  );

  // return (
  //   <View
  //     style={[justifyContentCenter, posititionAbsolute, zIndex(99)]}
  //     left="0"
  //     right="0"
  //     top="0"
  //     bottom="0"
  //     display={isLoading ? 'flex' : 'none'}
  //   >
  //     <Spinner />
  //   </View>
  // );
};
