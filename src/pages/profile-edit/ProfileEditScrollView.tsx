import { ScrollView } from '@gluestack-ui/themed';
import React from 'react';
import { backgroundColor } from 'src/styles';
import { colors } from 'src/theme';

import { ProfileEditPageContent } from './ProfileEditPageContent';

export const ProfileEditScrollView: React.FC = () => {
  return (
    <ScrollView flex={1} pt={2} pb={4} style={backgroundColor(colors.backgroundSecondary)}>
      <ProfileEditPageContent />
    </ScrollView>
  );
};
