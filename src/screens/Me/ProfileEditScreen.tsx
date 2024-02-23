import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { Box } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import { ProfileEditPageHeader } from 'src/pages/profile-edit/ProfileEditHeader';
import { ProfileEditScrollView } from 'src/pages/profile-edit/ProfileEditScrollView';

export const ProfileEditScreen: React.FC = () => {
  return (
    <>
      <ProfileEditPageHeader />
      <Box flex={1}>
        <ProfileEditScrollView />
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </Box>
    </>
  );
};
