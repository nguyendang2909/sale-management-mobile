// import { ScrollView, View } from '@gluestack-ui/themed';
// import { ViewAndroidSafeArea, ViewSafeArea } from 'src/components';
// import { UserProfile } from 'src/containers/UserProfile';
// import { AppStackScreenProps } from 'src/navigators';
// import { NearbyUserActions } from 'src/pages/dating-nearby-profile/NearbyUserActions';
// import React from 'react';

// type FCProps = AppStackScreenProps<'ProfileNearby'>;

// export const ProfileNearbyScreen: React.FC<FCProps> = props => {
//   const profile = props.route.params.profile;

//   return (
//     <>
//       <ViewAndroidSafeArea flex={1}>
//         <View position="absolute" bottom={0} left={0} right={0} zIndex={999}>
//           <NearbyUserActions targetUserId={profile._id} onClose={} />
//           <ViewSafeArea bottom />
//         </View>
//         <ScrollView flex={1} backgroundColor="$backgroundLight100">
//           <UserProfile profile={profile} />
//         </ScrollView>
//       </ViewAndroidSafeArea>
//     </>
//   );
// };
