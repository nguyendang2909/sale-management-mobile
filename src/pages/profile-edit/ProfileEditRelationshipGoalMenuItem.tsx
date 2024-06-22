// import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
// import React, { useState } from 'react';
// import { FontAwesome, MenuItem } from 'src/components';
// import { RELATIONSHIP_GOALS } from 'src/constants';
// import { RELATIONSHIP_GOAL_MESSAGES } from 'src/constants/constants';
// import { useAppSelector, useMessages } from 'src/hooks';
// import { ApiRequest, RelationshipGoal } from 'src/types';

// type FCProps = {
//   onPress: (payload: ApiRequest.UpdateProfile) => void;
// };

// export const ProfileEditRelationshipGoalMenuItem: React.FC<FCProps> = ({ onPress }) => {
//   const { formatMessage } = useMessages();
//   const currentRelationshipGoal = useAppSelector(state => state.app.profile?.relationshipGoal);
//   const [isInit, setInit] = useState<boolean>(false);
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const handleChange = (relationshipGoal: RelationshipGoal) => {
//     onClose();
//     onPress({ relationshipGoal });
//   };
//   const handleOpen = () => {
//     setInit(true);
//     onOpen();
//   };

//   return (
//     <>
//       <MenuItem
//         titleTx="Looking for"
//         leftIcon={<FontAwesome name="search" />}
//         {...(currentRelationshipGoal
//           ? {
//               valueTx: RELATIONSHIP_GOAL_MESSAGES[currentRelationshipGoal],
//             }
//           : {})}
//         onPress={handleOpen}
//       />

//       {isInit && (
//         <Actionsheet isOpen={isOpen} onClose={onClose}>
//           <Actionsheet.Content>
//             <Box mb={4}>
//               <Heading size="sm" textAlign="center">
//                 {formatMessage('Relationship goal')}
//               </Heading>
//             </Box>
//             {Object.values(RELATIONSHIP_GOALS).map(value => {
//               return (
//                 <Actionsheet.Item
//                   key={value}
//                   onPress={() => {
//                     handleChange(value);
//                   }}
//                 >
//                   <Text fontWeight={currentRelationshipGoal === value ? 'bold' : undefined}>
//                     {formatMessage(RELATIONSHIP_GOAL_MESSAGES[value])}
//                   </Text>
//                 </Actionsheet.Item>
//               );
//             })}
//           </Actionsheet.Content>
//         </Actionsheet>
//       )}
//     </>
//   );
// };
