// import { API_ENDPOINTS } from 'src/config/config.api';
// import { PROVIDE_TAGS } from 'src/constants/constants';
// import { ApiRequest, ApiResponse } from 'src/types';

// import { api } from './api';

// const profileFiltersApi = api.injectEndpoints({
//   endpoints: builder => ({
//     // Profile
//     getMyProfileFilter: builder.query<ApiResponse.ProfileFilterData, void>({
//       query: () => ({
//         url: API_ENDPOINTS.PROFILE_FILTERS.ME,
//         method: 'GET',
//       }),
//       providesTags: [PROVIDE_TAGS.MY_PROFILE_FILTER],
//     }),

//     updateMyProfileFilter: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfileFilter>({
//       query: body => ({
//         url: API_ENDPOINTS.PROFILE_FILTERS.ME,
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: (result, error) => {
//         if (error) {
//           return [];
//         }
//         return [PROVIDE_TAGS.MY_PROFILE_FILTER];
//       },
//     }),
//   }),
// });

// export const {
//   useGetMyProfileFilterQuery,
//   useUpdateMyProfileFilterMutation,
//   endpoints: profileFilterEndpoints,
// } = profileFiltersApi;
