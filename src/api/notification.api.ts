// import { API_ENDPOINTS } from 'src/config/config.api';
// import { API_METHODS } from 'src/constants/constants';
// import { ApiRequest, ApiResponse } from 'src/types';

// import { api } from './api';

// const notificationApi = api.injectEndpoints({
//   endpoints: builder => ({
//     fetchNotifications: builder.query<ApiResponse.Customer, void>({
//       query: () => ({
//         url: API_ENDPOINTS.ME.INDEX,
//         method: API_METHODS.GET,
//       }),
//       // providesTags: [PROVIDE_TAGS.ME],
//     }),

//     createMe: builder.mutation<ApiResponse.User, ApiRequest.CreateMe>({
//       query: body => ({
//         url: API_ENDPOINTS.ME.INDEX,
//         method: API_METHODS.POST,
//         body,
//       }),
//       invalidatesTags: [],
//     }),
//   }),
// });

// export const {
//   useFetchMeQuery,
//   useLazyFetchMeQuery,
//   useCreateMeMutation,
//   endpoints: notificationEnpoints,
// } = notificationApi;
