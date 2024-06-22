// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { MaterialCommunityIcons, MenuItem } from 'src/components';
// import { useAppSelector } from 'src/hooks';

// export const ProfileEditHeightMenuItem: React.FC = () => {
//   const navigation = useNavigation();

//   const value = useAppSelector(state => state.app.profile?.height);

//   const handleChange = () => {
//     navigation.navigate('EditInfoHeight');
//   };

//   return (
//     <>
//       <MenuItem
//         titleTx="Height"
//         leftIcon={<MaterialCommunityIcons name="human-male-height" />}
//         {...(value ? { value: `${value} cm` } : {})}
//         onPress={handleChange}
//       />
//     </>
//   );
// };
