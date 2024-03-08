// import moment from 'moment';
// import {
//   useGetNewestConversationsMutation,
//   useGetNextConversationsMutation,
//   useRefreshConversationsQuery,
// } from 'src/api';
// import { conversationsService } from 'src/services/conversationsService';
// import { matchSelects } from 'src/store/match/match.store';

// import { useAppSelector } from '../useAppSelector';

// export const useConversations = () => {
//   const conversations = useAppSelector(matchSelects.conversations);
//   const isReachedEnd = !!useAppSelector(s => s.match.infoConversations.isReachedEnd);
//   const lastRefreshedAt = useAppSelector(s => s.match.infoConversations.lastRefreshedAt);
//   const socketConnectedAt = useAppSelector(s => s.app.socket.connectedAt);
//   const conversationsLength = conversations.length;
//   const [getNewestConversations, { isLoading: isLoadingNewest }] =
//     useGetNewestConversationsMutation();
//   const [getNextConversations, { isLoading: isLoadingNext }] = useGetNextConversationsMutation();
//   const { isLoading } = useRefreshConversationsQuery(
//     {},
//     {
//       skip: !!lastRefreshedAt && moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
//     },
//   );

//   const fetchNewest = async () => {
//     getNewestConversations({});
//   };

//   const fetchNext = async () => {
//     const _next = conversationsService.getCursor(conversations);
//     if (isReachedEnd || !_next) {
//       return;
//     }
//     getNextConversations({ _next });
//   };

//   return {
//     length: conversationsLength,
//     data: conversations,
//     fetchNewest,
//     fetchNext,
//     isLoadingNewest,
//     isLoadingNext,
//     isLoading,
//     isReachedEnd,
//     lastRefreshedAt,
//   };
// };
