import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Header } from 'src/components';
import { colors } from 'src/theme';

export const LikedMeHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        backgroundColor={colors.backgroundSecondary}
        leftIcon="caretLeft"
        onLeftPress={navigation.goBack}
        titleTx="Who liked you?"
      />
    </>
  );
};
