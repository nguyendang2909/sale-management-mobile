import { View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { ProfileSettingHeader } from 'src/containers/ProfileSetting/ProfileSettingHeader';
import { ProfileSettingScrollView } from 'src/pages/profile-settings';

export const ProfileSettingScreen: FC = () => {
  return (
    <>
      <ProfileSettingHeader />

      <View flex={1} backgroundColor="$backgroundLight100">
        <ProfileSettingScrollView />
      </View>
    </>
  );
};
