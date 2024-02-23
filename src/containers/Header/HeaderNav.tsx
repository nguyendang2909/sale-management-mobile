import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Header } from 'src/components';
import { TxKey } from 'src/types';

type FCProps = {
  titleTx?: TxKey;
  title?: string;
};

export const HeaderNav: React.FC<FCProps> = ({ titleTx, title }) => {
  const { goBack } = useNavigation();

  return (
    <Header
      leftIcon="caretLeft"
      onLeftPress={goBack}
      {...(titleTx ? { titleTx } : {})}
      {...(title ? { title } : {})}
    />
  );
};
