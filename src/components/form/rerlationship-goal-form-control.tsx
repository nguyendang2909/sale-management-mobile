// import {
//   Actionsheet,
//   ActionsheetBackdrop,
//   ActionsheetContent,
//   ActionsheetItem,
//   Box,
//   Heading,
//   Text,
// } from '@gluestack-ui/themed';
// import React, { useState } from 'react';
// import { ARR_RELATIONSHIP_GOALS } from 'src/constants';
// import { RELATIONSHIP_GOAL_MESSAGES } from 'src/constants/constants';
// import { useDisclose } from 'src/hooks';
// import { useMessages } from 'src/hooks/useMessages';
// import { RelationshipGoal } from 'src/types';

// type FCProps = {
//   error?: string;
//   isRequired?: boolean;
//   onChange: (value: number) => void;
//   value?: RelationshipGoal;
// };

// export const RelationshipGoalFormControl: React.FC<FCProps> = ({
//   error,
//   value,
//   onChange,
//   isRequired,
// }) => {
//   const { formatMessage } = useMessages();

//   const [isInit, setInit] = useState<boolean>(false);
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const handleChange = (relationshipGoal: RelationshipGoal) => {
//     onClose();
//     onChange(relationshipGoal);
//   };
//   const handleOpen = () => {
//     setInit(true);
//     onOpen();
//   };

//   return (
//     <>
//       <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
//         <Stack>
//           <FormControl.Label>{formatMessage('What are you looking for here?')}</FormControl.Label>
//           <Pressable onPress={handleOpen}>
//             <Input
//               isReadOnly
//               size="lg"
//               variant="underlined"
//               placeholder={formatMessage('Please select')}
//               value={value ? formatMessage(RELATIONSHIP_GOAL_MESSAGES[value]) : ''}
//               InputRightElement={<ChevronDownIcon />}
//               onPressIn={handleOpen}
//             ></Input>
//           </Pressable>
//           <View pb={2}>
//             <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//               {error}
//             </FormControl.ErrorMessage>
//           </View>
//         </Stack>
//       </FormControl>

//       {isInit && (
//         <Actionsheet isOpen={isOpen} onClose={onClose}>
//           <ActionsheetBackdrop />
//           <ActionsheetContent>
//             <Box mb={4}>
//               <Heading size="sm" textAlign="center">
//                 {formatMessage('Relationship goal')}
//               </Heading>
//             </Box>
//             {ARR_RELATIONSHIP_GOALS.map(e => {
//               return (
//                 <ActionsheetItem
//                   key={e}
//                   onPress={() => {
//                     handleChange(e);
//                   }}
//                 >
//                   <Text fontWeight={e === value ? 'bold' : undefined}>
//                     {formatMessage(RELATIONSHIP_GOAL_MESSAGES[e])}
//                   </Text>
//                 </ActionsheetItem>
//               );
//             })}
//           </ActionsheetContent>
//         </Actionsheet>
//       )}
//     </>
//   );
// };
