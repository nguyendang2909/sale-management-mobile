import { Box } from '@gluestack-ui/themed';
import React from 'react';
import { FontAwesome } from 'src/components';

import { ButtonIcon } from './button-icon';

type FCProps = {
  onPress: () => void;
};

export const InfoIconButton: React.FC<FCProps> = ({ onPress }) => {
  return (
    <Box>
      <ButtonIcon height={48} width={48} backgroundColor="$black" onPress={onPress}>
        <FontAwesome color="white" size={24} name="info" />
      </ButtonIcon>
    </Box>
  );
};
