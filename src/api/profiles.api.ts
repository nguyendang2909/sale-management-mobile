import { Platform } from 'react-native';
import { API_ENDPOINTS } from 'src/config/config.api';
import { PROVIDE_TAGS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const profilesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile

    fetchMyProfile: builder.mutation<ApiResponse.Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES.ME.INDEX,
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfile>({
      query: body => ({
        url: API_ENDPOINTS.PROFILES.ME.INDEX,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [PROVIDE_TAGS.MY_PROFILE];
      },
    }),

    // NearbyUser
    refreshNearbyProfiles: builder.query<ApiResponse.Profiles, ApiRequest.FindManyNearbyProfiles>({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNewestNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNextNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),

    // Swipe profiles
    refreshSwipeProfiles: builder.query<ApiResponse.Profiles, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES.SWIPE,
        method: 'GET',
      }),
    }),
    // getNewestSwipeProfiles: builder.mutation<ApiResponse.Profiles, void>({
    //   query: () => ({
    //     url: API_URL.profilesNearby,
    //     method: 'GET',
    //   }),
    // }),
    getNextSwipeProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNextSwipeProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.SWIPE,
        method: 'GET',
        params,
      }),
    }),

    uploadBasicPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.UploadPhoto>({
      query: body => {
        const { file } = body;
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', {
          uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        return {
          url: API_ENDPOINTS.PROFILES.ME.BASIC_PHOTO,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [PROVIDE_TAGS.MY_PROFILE];
      },
    }),

    // NearbyUser
    getSubjectProfiles: builder.query<ApiResponse.Profiles, { teachingSubject: string }>({
      query: params => ({
        url: '/profiles/learning',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useRefreshNearbyProfilesQuery,
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useRefreshSwipeProfilesQuery,
  // useGetNewestSwipeProfilesMutation,
  useGetNextSwipeProfilesMutation,
  useFetchMyProfileMutation,
  endpoints: profileEndpoints,
  useUploadBasicPhotoMutation,
  useGetSubjectProfilesQuery,
} = profilesApi;
