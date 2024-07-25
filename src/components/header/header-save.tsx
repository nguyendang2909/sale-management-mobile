import { Button } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useMessages } from 'src/hooks/useMessages';

import { Header, HeaderProps } from './header';

type FCProps = HeaderProps & {
  onSave: () => void;
  isLoading: boolean;
};

export const HeaderSave: React.FC<FCProps> = ({ onSave, isLoading, ...props }) => {
  const { formatMessage } = useMessages();

  const { goBack } = useNavigation();

  return (
    <Header
      onLeftPress={goBack}
      RightActionComponent={
        <Button variant="link" onPress={onSave} isDisabled={isLoading}>
          {formatMessage('Save')}
        </Button>
      }
      {...props}
    />
  );
};
