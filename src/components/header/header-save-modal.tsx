import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React from 'react';
import { useIntl } from 'react-intl';
import { messages } from 'src/locales/messages';

import { Header, HeaderProps } from './header';

type FCProps = HeaderProps & {
  onSave: () => void;
  isLoading: boolean;
};

export const HeaderSaveModal: React.FC<FCProps> = ({ onSave, isLoading, ...props }) => {
  const t = useIntl();
  const { goBack } = useNavigation();

  return (
    <Header
      safeAreaEdges={[]}
      leftTx="Cancel"
      onLeftPress={goBack}
      RightActionComponent={
        <Button variant="unstyled" onPress={onSave} isLoading={isLoading}>
          {t.formatMessage(messages.Save)}
        </Button>
      }
      {...props}
    />
  );
};
