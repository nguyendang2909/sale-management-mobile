import { Button } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
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
      onLeftPress={navigation.goBack}
      RightActionComponent={
        <Button variant="link" onPress={onSave} disabled={isLoading}>
          {formatMessage('Done')}
        </Button>
      }
      {...props}
    />
  );
};
