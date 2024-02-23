import { API_ENDPOINTS } from 'src/config';
import { ApiRequest } from 'src/types';

import { api } from './api';

const signedDevicesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Signed devices
    updateSignedDevice: builder.mutation<void, ApiRequest.UpdateSignedDevice>({
      query: body => ({
        url: API_ENDPOINTS.SIGNED_DEVICES.INDEX,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useUpdateSignedDeviceMutation } = signedDevicesApi;
