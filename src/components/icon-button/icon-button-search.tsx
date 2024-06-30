import { CloseIcon, Icon, SearchIcon, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'src/types';

export const IconButtonSearch: FC<
  ViewProps & {
    isSearching?: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
> = ({ isSearching, onClose, onOpen, ...viewProps }) => {
  return (
    <View
      p={8}
      {...(isSearching ? viewProps : {})}
      as={TouchableOpacity}
      onPress={isSearching ? onOpen : onClose}
    >
      {isSearching ? (
        <Icon color="$coolGray500" as={CloseIcon} size="lg" />
      ) : (
        <Icon color="$coolGray500" as={SearchIcon} size="lg" />
      )}
    </View>
  );
};
