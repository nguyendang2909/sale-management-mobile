// import { View } from '@gluestack-ui/themed';
// import { useNavigation } from '@react-navigation/native';
// import { useFormik } from 'formik';
// import React from 'react';
// import Toast from 'react-native-toast-message';
// import { useUpdateProfileMutation } from 'src/api';
// import { HeaderSave } from 'src/components/header';
// import { useAppSelector, useMessages } from 'src/hooks';
// import * as Yup from 'yup';

// export const EditInfoInterestScreen = () => {
//   const { formatMessage } = useMessages();
//   const { goBack } = useNavigation();
//   const [updateProfile] = useUpdateProfileMutation();

//   const value = useAppSelector(state => state.app.profile?.weight);

//   const formik = useFormik<{ weight: number }>({
//     enableReinitialize: true,
//     initialValues: {
//       weight: value || 50,
//     },
//     validationSchema: Yup.object().shape({
//       weight: Yup.number().required(formatMessage('Please enter your weight.')),
//     }),

//     onSubmit: async values => {
//       try {
//         await updateProfile(values).unwrap();
//       } catch (err) {
//         Toast.show({
//           text1: formatMessage('Update failed, please try again.'),
//         });
//       }

//       goBack();
//     },
//   });

//   return (
//     <>
//       <HeaderSave
//         titleTx="Relationship goal"
//         onSave={() => formik.handleSubmit()}
//         isLoading={formik.isSubmitting}
//       />

//       <View mt={16} mb={16} px={16}>
//         {/* <FormControlInput
//           label={formatMessage('Gender')}
//           value={formik.values.gender}
//           onChange={formik.handleChange('nickname')}
//           placeholder={formatMessage('Please enter your w', {
//             w: t('nickname'),
//           })}
//           error={formik.errors.gender}
//         /> */}
//       </View>
//     </>
//   );
// };
