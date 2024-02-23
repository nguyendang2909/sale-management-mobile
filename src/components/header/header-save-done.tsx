import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React from 'react';
import { useMessages } from 'src/hooks';

import { Header, HeaderProps } from './header';

type FCProps = HeaderProps & {
  onSave: () => void;
  isLoading: boolean;
};

export const HeaderSaveDone: React.FC<FCProps> = ({ onSave, isLoading, ...props }) => {
  const { formatMessage } = useMessages();
  const navigation = useNavigation();

  return (
    <Header
      leftIcon="caretLeft"
      onLeftPress={navigation.goBack}
      RightActionComponent={
        <Button variant="unstyled" onPress={onSave} isLoading={isLoading}>
          {formatMessage('Done')}
        </Button>
      }
      {...props}
    />
  );
};
