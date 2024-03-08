// import { Box, ScrollView, Text, View } from '@gluestack-ui/themed';
// import React from 'react';
// import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ViewStyle } from 'react-native';
// import { ConversationBox } from 'src/containers/Conversation/ConversationBox';
// import { useMatches } from 'src/hooks';
// import { useConversations } from 'src/hooks/temp/useConversations';
// import { scrollUtil } from 'src/utils/scroll.util';

// import { MatchCards } from './MatchCards';
// import { NoConversationBox } from './NoConversationBox';

// export const ConversationsScrollView: React.FC = () => {
//   const {
//     fetchNext: fetchNextConversations,
//     length: conversationsLength,
//     data: conversations,
//     isLoadingNewest: isLoadingNewestConversations,
//     fetchNewest: fetchNewestConversations,
//     lastRefreshedAt: conversationsLastRefreshedAt,
//   } = useConversations();

//   const { data: matches, fetchNewest: fetchNewestMatches } = useMatches();

//   const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     if (!scrollUtil.isCloseToBottom(e)) {
//       fetchNextConversations();
//     }
//   };

//   const handleRefresh = () => {
//     fetchNewestConversations();
//     fetchNewestMatches();
//   };

//   return (
//     <ScrollView
//       flex={1}
//       contentContainerStyle={scrollViewContentContainerStyle}
//       showsVerticalScrollIndicator={false}
//       onScroll={handleScroll}
//       scrollEventThrottle={16}
//       refreshControl={
//         <RefreshControl
//           refreshing={isLoadingNewestConversations}
//           onRefresh={handleRefresh}
//         ></RefreshControl>
//       }
//     >
//       <Box>
//         <MatchCards matches={matches} />
//       </Box>

//       {conversationsLength && conversationsLastRefreshedAt ? (
//         <>
//           <Box px={16} mt={8}>
//             <Text bold>Messages</Text>
//           </Box>
//           <View flex={1}>
//             {conversations.map(item => {
//               return <ConversationBox key={item._id} data={item} />;
//             })}
//           </View>
//         </>
//       ) : (
//         <NoConversationBox></NoConversationBox>
//       )}
//     </ScrollView>
//   );
// };

// const scrollViewContentContainerStyle: ViewStyle = {
//   flexGrow: 1,
// };
