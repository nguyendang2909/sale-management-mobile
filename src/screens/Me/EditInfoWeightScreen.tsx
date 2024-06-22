// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useFormik } from 'formik';
// import { Box, Text, View } from 'native-base';
// import React from 'react';
// import { useUpdateProfileMutation } from 'src/api';
// import { HeaderSaveModal } from 'src/components/header';
// import { useAppSelector, useMessages } from 'src/hooks';
// import { notificationsService } from 'src/services/notifications/notifications.service';
// import * as Yup from 'yup';

// export const EditInfoWeightScreen = () => {
//   const { formatMessage } = useMessages();
//   const { goBack } = useNavigation();

//   const value = useAppSelector(state => state.app.profile?.weight);

//   const [submitUpdateProfile] = useUpdateProfileMutation();

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
//         await submitUpdateProfile(values);

//         notificationsService.updateSuccess();

//         goBack();
//       } catch (err) {
//         notificationsService.updateFail();
//       }
//     },
//   });

//   return (
//     <Box flex="1" safeAreaY>
//       <HeaderSaveModal
//         titleTx="Weight"
//         onSave={() => formik.handleSubmit()}
//         isLoading={formik.isSubmitting}
//       />

//       <View mt={4} mb={4} px={4}>
//         <Text color="gray.500">{`${formatMessage('My weight is')} (${formatMessage('kg')}):`}</Text>
//       </View>

//       <View mt={4} mb={4} px={4}>
//         <Picker
//           selectedValue={formik.values.weight}
//           onValueChange={itemValue => formik.setFieldValue('weight', itemValue)}
//         >
//           {Array.from({ length: 100 }, (value, index) => {
//             const heightValue = index + 30;

//             return <Picker.Item key={index} label={heightValue.toString()} value={heightValue} />;
//           })}
//         </Picker>
//       </View>
//     </Box>
//   );
// };
