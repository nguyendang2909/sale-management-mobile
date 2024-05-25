import { Box, HStack, View, VStack } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { Header } from 'src/components';
import { ProfileSettingIconButton } from 'src/containers/IconButton/ProfileSettingIconButton';
import { ProfileHeader } from 'src/containers/Profile/ProfileHeader';
import { colors } from 'src/theme';

export const ProfileScreen: FC = () => {
  return (
    <>
      <Header
        RightActionComponent={
          <View mr={16}>
            <ProfileSettingIconButton />
          </View>
        }
      />
      <Box backgroundColor={colors.primary}>
        <View>
          <ProfileHeader />
        </View>

        <View padding={4}>
          <VStack rowGap={16} columnGap={16}>
            <HStack rowGap={16} columnGap={16}>
              <View flex={1}>{/* <ProfileEditCard /> */}</View>
            </HStack>
          </VStack>
        </View>
      </Box>
    </>
  );
};
