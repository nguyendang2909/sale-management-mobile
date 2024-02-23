import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Box, useToast, View } from 'native-base';
import React from 'react';
import { useUpdateProfileMutation } from 'src/api';
import { FormControlInput } from 'src/components/form/form-control-input';
import { HeaderSaveModal } from 'src/components/header';
import { useAppSelector, useMessages } from 'src/hooks';
import * as Yup from 'yup';

export const EditInfoNicknameScreen = () => {
  const { formatMessage } = useMessages();

  const [updateProfile] = useUpdateProfileMutation();

  const { goBack } = useNavigation();

  const toast = useToast();

  const currentNickname = useAppSelector(state => state.app.profile?.nickname);

  const formik = useFormik<{ nickname: string }>({
    enableReinitialize: true,
    initialValues: {
      nickname: currentNickname || '',
    },
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(formatMessage('Please enter your nickname')),
    }),

    onSubmit: async values => {
      try {
        await updateProfile(values).unwrap();
      } catch (err) {
        toast.show({ title: 'Update nickname failed', placement: 'top' });
      }

      goBack();
    },
  });

  return (
    <Box flex="1" safeAreaY>
      <HeaderSaveModal
        titleTx="Nickname"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        <FormControlInput
          label={formatMessage('Nickname')}
          value={formik.values.nickname}
          onChange={formik.handleChange('nickname')}
          placeholder={formatMessage('Please enter your nickname')}
          error={formik.errors.nickname}
        />
      </View>
    </Box>
  );
};
