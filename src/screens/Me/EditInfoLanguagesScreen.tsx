// import { View } from '@gluestack-ui/themed';
// import { useNavigation } from '@react-navigation/native';
// import { useFormik } from 'formik';
// import React from 'react';
// import Toast from 'react-native-toast-message';
// import { useUpdateProfileMutation } from 'src/api';
// import { HeaderSave } from 'src/components/header';
// import { useAppSelector, useMessages } from 'src/hooks';
// import * as Yup from 'yup';

// export const EditInfoLanguagesScreen = () => {
//   const { formatMessage } = useMessages();

//   const [updateProfile] = useUpdateProfileMutation();

//   const { goBack } = useNavigation();

//   const languages = useAppSelector(state => state.app.profile?.languages);

//   const formik = useFormik<{ languages?: string[] }>({
//     enableReinitialize: true,
//     initialValues: {
//       languages,
//     },
//     validationSchema: Yup.object().shape({
//       height: Yup.array().required(formatMessage('Please enter your height')),
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
//         titleTx="Height"
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
