// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useFormik } from 'formik';
// import { Box, Text, View } from 'native-base';
// import React from 'react';
// import { useUpdateProfileMutation } from 'src/api';
// import { HeaderSaveModal } from 'src/components/header';
// import { SCREENS } from 'src/constants';
// import { useAppSelector, useMessages } from 'src/hooks';
// import { goBack } from 'src/navigations/navigation-ref';
// import { notificationsService } from 'src/services/notifications/notifications.service';
// import * as Yup from 'yup';

// export const EditInfoHeightScreen = () => {
//   const { formatMessage } = useMessages();
//   const [updateProfile] = useUpdateProfileMutation();
//   const navigation = useNavigation();
//   const currentHeight = useAppSelector(state => state.app.profile?.height);

//   const formik = useFormik<{ height: number }>({
//     enableReinitialize: true,
//     initialValues: {
//       height: currentHeight || 165,
//     },
//     validationSchema: Yup.object().shape({
//       height: Yup.string().required(formatMessage('Please enter your height')),
//     }),

//     onSubmit: async values => {
//       try {
//         await updateProfile(values).unwrap();
//         notificationsService.updateSuccess();
//         goBack(SCREENS.ProfileEdit);
//       } catch (err) {
//         notificationsService.updateFail();
//       }
//     },
//   });

//   return (
//     <Box flex="1" safeAreaY>
//       <HeaderSaveModal
//         titleTx="Height"
//         onSave={() => formik.handleSubmit()}
//         isLoading={formik.isSubmitting}
//       />
//       <View mt={4} mb={4} px={4}>
//         <Text color="gray.500">{`${formatMessage('My height is')} (${formatMessage('cm')}):`}</Text>
//       </View>
//       <View mt={4} mb={4} px={4}>
//         <Picker
//           selectedValue={formik.values.height}
//           onValueChange={itemValue => formik.setFieldValue('height', itemValue)}
//         >
//           {Array.from({ length: 100 }, (value, index) => {
//             const heightValue = index + 100;
//             return <Picker.Item key={index} label={heightValue.toString()} value={heightValue} />;
//           })}
//         </Picker>
//       </View>
//     </Box>
//   );
// };
