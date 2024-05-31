import { CloseIcon, Icon, Pressable, SearchIcon, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

export const IconButtonSearch: FC<
  ViewProps & {
    isSearching?: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
> = ({ isSearching, onClose, onOpen, ...viewProps }) => {
  return (
    <View {...(isSearching ? viewProps : {})}>
      {isSearching ? (
        <Pressable onPress={onOpen}>
          <Icon color="$coolGray500" as={CloseIcon} size="xl" />
        </Pressable>
      ) : (
        <Pressable onPress={onClose}>
          <Icon color="$coolGray500" as={SearchIcon} size="xl" />
        </Pressable>
      )}
    </View>
  );
};
