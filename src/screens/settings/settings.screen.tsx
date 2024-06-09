import { View } from '@gluestack-ui/themed';
import { FC } from 'react';

import { ContentSettings } from './views/content-settings';
import { HeaderSettings } from './views/header/header-settings';

export const SettingsScreen: FC = () => {
  return (
    <>
      <HeaderSettings />

      <View flex={1} backgroundColor="$backgroundLight100">
        <ContentSettings />
      </View>
    </>
  );
};
