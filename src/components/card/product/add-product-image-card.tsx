import { Icon, Spinner, View } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import { MaterialIcons } from 'src/components';
import { aspectRatio, backgroundColor, borderColor, borderRadius } from 'src/styles';

type FCProps = {
  onPress: () => void;
  isLoading?: boolean;
};

export const AddProductImageCard: React.FC<FCProps> = ({ onPress, isLoading }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        { padding: 4, width: 100 },
        borderColor('#d4d8de'),
        borderRadius(20),
        backgroundColor('#d4d8de'),
        aspectRatio(1 / 1),
      ]}
    >
      <View flex={1} justifyContent="center" alignItems="center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Icon
            size="xxl"
            as={MaterialIcons}
            // @ts-ignore
            name="add-to-photos"
          />
        )}
      </View>
    </TouchableHighlight>
  );
};
