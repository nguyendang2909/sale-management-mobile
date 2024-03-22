import { Divider, Row, Text, View } from 'native-base';
import React from 'react';
import Toast from 'react-native-toast-message';
import { useUpdateProfileMutation } from 'src/api';
import { useMessages } from 'src/hooks';
import { paddingHorizontal } from 'src/styles';
import { colors, spacing } from 'src/theme';
import { ApiRequest } from 'src/types';

import { ProfileEditLearningTargetMenuItem } from './profile-edit-learning-tareget-menu-item';
import { ProfileEditTeachingSubjectMenuItem } from './profile-edit-teaching-subject-menu-item';
import { ProfileEditBirthdayMenuItem } from './ProfileEditBirthdayMenuItem';
import { ProfileEditGenderMenuItem } from './ProfileEditGenderMenuItem';
import { ProfileEditHeightMenuItem } from './ProfileEditHeightMenuItem';
import { ProfileEditIntroduceMenuItem } from './ProfileEditIntroductionMenuItem';
import { ProfileEditJobTitleMenuItem } from './ProfileEditJobTitleMenuItem';
import { ProfileEditLocationMenuItem } from './ProfileEditLocationMenuItem';
import { ProfileEditNicknameMenuItem } from './ProfileEditNicknameMenuItem';
import { ProfileEditPhotos } from './ProfileEditPhotos/profile-edit-media-files';
import { ProfileEditWeightMenuItem } from './ProfileEditWeight';

export const ProfileEditPageContent: React.FC = () => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [updateProfile] = useUpdateProfileMutation();

  const handleEditProfile = async (payload: ApiRequest.UpdateProfile) => {
    try {
      // console.log(111, payload);
      await updateProfile(payload).unwrap();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
        type: 'error',
      });
    }
  };

  return (
    <>
      <Row style={paddingHorizontal(spacing.md)}>
        <ProfileEditPhotos />
      </Row>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Profile')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditNicknameMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditBirthdayMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditGenderMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditHeightMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditWeightMenuItem />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('About me')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditIntroduceMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Location')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditLocationMenuItem />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            Training target
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditLearningTargetMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditTeachingSubjectMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      {/* <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Relationship')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipGoalMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipStatusMenuItem onPress={handleEditProfile} />
        </View>
      </View> */}

      {/* <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Languages')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditLanguagesMenuItem />
        </View>
      </View> */}

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Job title')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditJobTitleMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      {/* <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {formatMessage('Control your profile')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileShowAgeMenuItem onPress={handleEditProfile} />
        </View>
        <View backgroundColor={colors.background}>
          <ProfileShowMyDistanceMenuItem onPress={handleEditProfile} />
        </View>
      </View> */}

      <View mt={100}></View>
    </>
  );
};
