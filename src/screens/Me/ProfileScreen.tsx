import { Box, HStack, View, VStack } from 'native-base';
import React, { FC } from 'react';
import { Header } from 'src/components';
import { ProfileSettingIconButton } from 'src/containers/IconButton/ProfileSettingIconButton';
import { ProfileEditCard } from 'src/containers/Profile/ProfileEditCard';
import { ProfileHeader } from 'src/containers/Profile/ProfileHeader';
import { SettingsBecomeTeacher } from 'src/pages/settings/settings-become-a-teacher';
import { colors } from 'src/theme';

export const ProfileScreen: FC = () => {
  return (
    <>
      <Header
        RightActionComponent={
          <View mr={4}>
            <ProfileSettingIconButton />
          </View>
        }
      />
      <Box backgroundColor={colors.primary}>
        <View>
          <ProfileHeader />
        </View>

        <View padding={4}>
          <VStack space={4}>
            <HStack space={4}>
              <View flex="1">
                <ProfileEditCard />
              </View>
              {/* <View flex="1">
                <ProfileVisitorsCard />
              </View> */}
              {/* <View flex="1">
                <ProfileFreeCoinsCard />
              </View> */}
            </HStack>
            {/* <SettingsUpgradePlan /> */}
            <SettingsBecomeTeacher />
          </VStack>
        </View>
      </Box>
    </>
  );
};
