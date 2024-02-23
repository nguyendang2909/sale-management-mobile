import messaging from '@react-native-firebase/messaging';
import React, { useCallback, useEffect } from 'react';
import { useUpdateSignedDeviceMutation } from 'src/api';
import { useAppSelector } from 'src/hooks';
import { signedDevicesService } from 'src/services/signed-devices.service';

export const RequestNotificationPermission: React.FC = () => {
  const [updateSignedDevice] = useUpdateSignedDeviceMutation();
  const refreshToken = useAppSelector(state => state.app.refreshToken);

  const request = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    try {
      const authorizationStatus = await messaging().requestPermission();
      if (
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const deviceToken = await messaging().getToken();
        await updateSignedDevice({
          devicePlatform: signedDevicesService.getDevicePlatform(),
          refreshToken,
          deviceToken,
        }).unwrap();
      }
    } catch (err) {
      console.log(err);
    }
  }, [refreshToken, updateSignedDevice]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    request();
  }, [request]);
  return <></>;
};
