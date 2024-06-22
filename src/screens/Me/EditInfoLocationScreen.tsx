// import { useNavigation } from '@react-navigation/native';
// import { useFormik } from 'formik';
// import { Box, View } from 'native-base';
// import React from 'react';
// import { useUpdateProfileMutation } from 'src/api';
// import { SelectCountryFormControl } from 'src/components/form/select-country-form-control';
// import { HeaderSaveModal } from 'src/components/header';
// import { SCREENS } from 'src/constants';
// import { useAppSelector, useMessages } from 'src/hooks';
// import { region } from 'src/locales/locale';
// import { notificationsService } from 'src/services/notifications/notifications.service';
// import * as Yup from 'yup';

// export const EditInfoLocationScreen = () => {
//   const { formatMessage } = useMessages();
//   const [updateProfile] = useUpdateProfileMutation();
//   const { goBack, canGoBack, navigate } = useNavigation();
//   const currentLocationState = useAppSelector(state => state.app.profile?.state);

//   const formik = useFormik<{ countryIso2: string; stateId?: string }>({
//     enableReinitialize: true,
//     initialValues: {
//       countryIso2: currentLocationState?.country?.iso2 || region,
//       stateId: currentLocationState?._id,
//     },
//     validationSchema: Yup.object().shape({
//       stateId: Yup.string().required(formatMessage('Please choose your city')),
//     }),
//     onSubmit: async values => {
//       try {
//         const { stateId } = values;
//         if (!stateId) {
//           return;
//         }
//         await updateProfile({ stateId }).unwrap();
//         notificationsService.updateSuccess();
//         if (canGoBack()) {
//           goBack();
//         } else {
//           navigate(SCREENS.ProfileEdit);
//         }
//       } catch (err) {
//         notificationsService.updateFail();
//       }
//     },
//   });

//   const handleChangeCountryIso2 = (value: string) => {
//     formik.setFieldValue('countryIso2', value);
//   };

//   const handleChangeStateId = (value?: string) => {
//     formik.setFieldValue('stateId', value);
//   };

//   return (
//     <Box flex="1" safeAreaY>
//       <HeaderSaveModal
//         titleTx="Location"
//         onSave={() => formik.handleSubmit()}
//         isLoading={formik.isSubmitting}
//       />
//       <View mt={4} mb={4} px={4}>
//         <SelectCountryFormControl
//           isRequired={true}
//           error={formik.touched.stateId ? formik.errors.stateId : undefined}
//           onChangeCountry={handleChangeCountryIso2}
//           onChangeCity={handleChangeStateId}
//           countryValue={formik.values.countryIso2}
//           cityValue={formik.values.stateId}
//         />
//       </View>
//     </Box>
//   );
// };
