import { Platform } from 'react-native';
import { API_ENDPOINTS } from 'src/config/config.api';
import { PROVIDE_TAGS } from 'src/constants/constants';
import { ApiRequest, ApiResponse } from 'src/types';

import { api } from './api';

const mediaFilesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Photos
    uploadPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.UploadPhoto>({
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
          url: API_ENDPOINTS.PHOTOS.INDEX,
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

    removePhoto: builder.mutation<ApiResponse.RemoveData, string>({
      query: (id: string) => ({
        url: `${API_ENDPOINTS.PHOTOS.INDEX}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [PROVIDE_TAGS.MY_PROFILE];
      },
    }),
  }),
});

export const { useUploadPhotoMutation, useRemovePhotoMutation } = mediaFilesApi;
