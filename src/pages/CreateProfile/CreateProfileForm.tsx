import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import { Box, Button, Heading, ScrollView, View } from 'native-base';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useCreateBasicProfileMutation, useFetchMyProfileMutation } from 'src/api';
import { BirthDayFormControl, FormControlInput, SelectGenderFormControl } from 'src/components';
import { LearningTargetFormControl } from 'src/components/form/learning-target-form-control';
import { SelectCountryFormControl } from 'src/components/form/select-country-form-control';
import { TeachingSubjectFormControl } from 'src/components/form/teaching-subject-form-control';
import { RELATIONSHIP_GOALS, SCREENS } from 'src/constants';
import { UserGender } from 'src/constants/constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { region } from 'src/locales/locale';
import { appActions } from 'src/store/app.store';
import { flexGrow } from 'src/styles';
import { FormParams, RelationshipGoal } from 'src/types';
import * as Yup from 'yup';

export const CreateProfileForm: FC = () => {
  const { formatMessage } = useMessages();
  const [createBasicProfile] = useCreateBasicProfileMutation();
  const profile = useAppSelector(state => state.app.profile);
  const navigation = useNavigation();
  const [fetchMyProfile] = useFetchMyProfileMutation();
  const dispatch = useDispatch();

  const handleChangeGender = (value: UserGender) => {
    formik.setFieldValue('gender', value);
  };

  const handleChangeRelationshipGoal = (value: RelationshipGoal) => {
    formik.setFieldValue('relationshipGoal', value);
  };

  const handleChangeLearningTarget = (value: string) => {
    formik.setFieldValue('learningTarget', value);
  };

  const handleChangeTeachingSubject = (value: string) => {
    formik.setFieldValue('teachingSubject', value);
  };

  const handleChangeCountryIso2 = (value: string) => {
    formik.setFieldValue('countryIso2', value);
  };

  const handleChangeStateId = (value?: string) => {
    formik.setFieldValue('stateId', value);
  };

  const formik = useFormik<FormParams.CreateProfile>({
    initialValues: {
      nickname: profile?.nickname,
      gender: profile?.gender,
      birthday: profile?.birthday ? moment(profile?.birthday).format('YYYY-MM-DD') : undefined,
      relationshipGoal: RELATIONSHIP_GOALS.BOY_GIRL_FRIEND,
      introduce: profile?.introduce,
      countryIso2: profile.state?.country?.iso2 || region,
      stateId: profile.state?._id,
      learningTarget: 'Language',
      teachingSubject: undefined,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(formatMessage('Please enter your nickname')),
      gender: Yup.number().required(formatMessage('Please enter your gender')),
      birthday: Yup.string().required(formatMessage('Please enter your birthday')),
      relationshipGoal: Yup.string().required(formatMessage('Please choose your desire relation.')),
      introduce: Yup.string().max(500).notRequired(),
      stateId: Yup.string().required(formatMessage('Please choose your city')),
      learningTarget: Yup.string().optional(),
      teachingSubject: Yup.string().optional(),
    }),
    onSubmit: async values => {
      try {
        const {
          nickname,
          gender,
          birthday,
          relationshipGoal,
          introduce,
          stateId,
          learningTarget,
          teachingSubject,
        } = values;
        if (nickname && gender && birthday && relationshipGoal && stateId) {
          await createBasicProfile({
            nickname,
            gender,
            birthday,
            relationshipGoal,
            introduce,
            stateId,
            learningTarget,
            teachingSubject,
          }).unwrap();
          navigation.navigate(SCREENS.CREATE_BASIC_PHOTOS);
        }
      } catch (error) {
        if (_.get(error, 'status') === 409) {
          try {
            const profile = await fetchMyProfile().unwrap();
            dispatch(appActions.setProfile(profile.data));
            navigation.navigate(SCREENS.CREATE_BASIC_PHOTOS);
            return;
          } catch (err) {}
        }
        Toast.show({
          text1: formatMessage('Oops, something went wrong. Please try again.'),
        });
      }
    },
  });

  return (
    <>
      <Box flex="1" safeAreaY>
        <View flex="1">
          <View flex="1">
            <ScrollView style={flexGrow}>
              <View px="4" py="4">
                <Heading>{formatMessage('Your profile')}</Heading>
              </View>

              <View px="4">
                <View mb="4">
                  <FormControlInput
                    isRequired
                    label={formatMessage('Nickname')}
                    value={formik.values.nickname}
                    onChange={formik.handleChange('nickname')}
                    placeholder={formatMessage('Please enter your nickname')}
                    error={formik.touched.nickname ? formik.errors.nickname : undefined}
                  />
                </View>

                <View mb="4">
                  <SelectGenderFormControl
                    isRequired
                    value={formik.values.gender}
                    onChange={handleChangeGender}
                    error={formik.touched.gender ? formik.errors.gender : undefined}
                  />
                </View>

                <View mb="4">
                  <BirthDayFormControl
                    isRequired
                    value={formik.values.birthday}
                    onChange={formik.handleChange('birthday')}
                    error={formik.touched.birthday ? formik.errors.birthday : undefined}
                  />
                </View>

                <View mb="4">
                  <SelectCountryFormControl
                    isRequired
                    countryValue={formik.values.countryIso2}
                    cityValue={formik.values.stateId}
                    onChangeCountry={handleChangeCountryIso2}
                    onChangeCity={handleChangeStateId}
                    error={formik.touched.stateId ? formik.errors.stateId : undefined}
                  />
                </View>

                {/* <View mb="4">
                  <RelationshipGoalFormControl
                    isRequired
                    value={formik.values.relationshipGoal}
                    onChange={handleChangeRelationshipGoal}
                    error={
                      formik.touched.relationshipGoal ? formik.errors.relationshipGoal : undefined
                    }
                  />
                </View> */}

                <View mb="4">
                  <LearningTargetFormControl
                    isRequired
                    value={formik.values.learningTarget}
                    onChange={handleChangeLearningTarget}
                    error={formik.touched.learningTarget ? formik.errors.learningTarget : undefined}
                  />
                </View>

                <View mb="4">
                  <TeachingSubjectFormControl
                    value={formik.values.teachingSubject}
                    onChange={handleChangeTeachingSubject}
                    error={
                      formik.touched.teachingSubject ? formik.errors.teachingSubject : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <FormControlInput
                    label={formatMessage('Introduce')}
                    value={formik.values.introduce}
                    onChange={formik.handleChange('introduce')}
                    placeholder={formatMessage('Please enter your introduce')}
                    maxLength={500}
                    error={formik.touched.introduce ? formik.errors.introduce : undefined}
                  />
                </View>
              </View>
            </ScrollView>

            <View px="4" py="4">
              <Button
                isLoading={formik.isSubmitting}
                onPress={() => {
                  formik.handleSubmit();
                }}
              >
                {formatMessage('Continue')}
              </Button>
            </View>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </Box>
    </>
  );
};
