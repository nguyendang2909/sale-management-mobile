import { Box, ChevronLeftIcon, Icon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from 'src/constants';

export const BackIconButton: React.FC<{ prevScreen: (typeof SCREENS)[keyof typeof SCREENS] }> = ({
  prevScreen,
}) => {
  const { goBack, canGoBack, navigate } = useNavigation();

  const handleGoBack = () => {
    if (canGoBack()) {
      goBack();
    }
    navigate(prevScreen);
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <Box p={8}>
        <Icon h={24} w={24} as={ChevronLeftIcon} />
      </Box>
    </TouchableOpacity>
  );
};
