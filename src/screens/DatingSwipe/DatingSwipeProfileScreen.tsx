// import { Box, ScrollView } from '@gluestack-ui/themed';
// import { UserProfile } from 'src/containers/UserProfile';
// import { AppStackScreenProps } from 'src/navigators';
// import { NearbyUserActions } from 'src/pages/dating-nearby-profile/NearbyUserActions';
// import React from 'react';
// import { SafeAreaView } from 'react-native';

// type FCProps = AppStackScreenProps<'ProfileNearby'>;

// export const DatingSwipeProfileScreen: React.FC<FCProps> = props => {
//   const profile = props.route.params.profile;

//   return (
//     <>
//       <Box flex={1}>
//         <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
//           <NearbyUserActions targetUserId={profile._id}  />
//           <SafeAreaView />
//         </Box>
//         <ScrollView flex={1} backgroundColor="$backgroundLight100">
//           <UserProfile profile={profile} />
//         </ScrollView>
//       </Box>
//     </>
//   );
// };
