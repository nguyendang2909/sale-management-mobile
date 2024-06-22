// import { API_ENDPOINTS } from 'src/config';
// import { ApiRequest, ApiResponse } from 'src/types';

// import { api } from './api';

// const viewsApi = api.injectEndpoints({
//   endpoints: builder => ({
//     // Views
//     sendView: builder.mutation<void, ApiRequest.SendView>({
//       query: body => ({
//         url: API_ENDPOINTS.VIEWS.INDEX,
//         method: 'POST',
//         body,
//       }),
//     }),
//     getViews: builder.query<ApiResponse.Views, void>({
//       query: () => ({
//         url: API_ENDPOINTS.VIEWS.INDEX,
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// export const { useSendViewMutation, useGetViewsQuery } = viewsApi;
