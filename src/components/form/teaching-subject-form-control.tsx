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
// import { SUBJECTS } from 'src/constants/teacher.constants';
// import { useDisclose } from 'src/hooks';
// import { useMessages } from 'src/hooks/useMessages';

// type FCProps = {
//   error?: string;
//   isRequired?: boolean;
//   onChange: (value: string) => void;
//   value?: string;
// };

// export const TeachingSubjectFormControl: React.FC<FCProps> = ({
//   error,
//   value,
//   onChange,
//   isRequired,
// }) => {
//   const { formatMessage } = useMessages();

//   const [isInit, setInit] = useState<boolean>(false);
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const handleChange = (teachingSubject: string) => {
//     onClose();
//     onChange(teachingSubject);
//   };
//   const handleOpen = () => {
//     setInit(true);
//     onOpen();
//   };

//   return (
//     <>
//       <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
//         <Stack>
//           <FormControl.Label>{formatMessage('What is your teaching subject?')}</FormControl.Label>
//           <Pressable onPress={handleOpen}>
//             <Input
//               isReadOnly
//               size="lg"
//               variant="underlined"
//               placeholder={formatMessage('Please select')}
//               value={value}
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
//                 {formatMessage('What is your teaching subject?')}
//               </Heading>
//             </Box>
//             {SUBJECTS.map(e => {
//               return (
//                 <ActionsheetItem
//                   key={e}
//                   onPress={() => {
//                     handleChange(e);
//                   }}
//                 >
//                   <Text fontWeight={e === value ? 'bold' : undefined}>{e}</Text>
//                 </ActionsheetItem>
//               );
//             })}
//           </ActionsheetContent>
//         </Actionsheet>
//       )}
//     </>
//   );
// };
