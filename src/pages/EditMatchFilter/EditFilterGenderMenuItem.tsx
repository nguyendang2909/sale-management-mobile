// import React from 'react';
// import { FilterGenderActionSheet, MaterialCommunityIcons, MenuItem } from 'src/components';
// import { GENDER_MESSAGES } from 'src/constants/constants';
// import { useDisclose } from 'src/hooks';
// import { Gender } from 'src/types';

// type FCProps = {
//   value?: Gender;
//   onChange: (gender: Gender) => void;
// };

// export const EditFilterGenderMenuItem: React.FC<FCProps> = ({ value, onChange }) => {
//   const { isOpen, onOpen, onClose } = useDisclose();

//   return (
//     <>
//       <MenuItem
//         titleTx="Gender"
//         leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
//         {...(value ? { valueTx: GENDER_MESSAGES[value] } : {})}
//         onPress={onOpen}
//       />

//       <FilterGenderActionSheet
//         isOpen={isOpen}
//         onClose={onClose}
//         value={value}
//         onChange={onChange}
//       />
//     </>
//   );
// };
