import React, { useEffect, useState } from 'react';
import { PermissionStatus, RESULTS } from 'react-native-permissions';
import { RequireEnalbeLocationSharing } from 'src/containers/DatingSwipe/RequireEnableLocationSharing';
import { useAppSelector } from 'src/hooks';
import { locationPermissionsService } from 'src/services/location-permissions.service';

import { DatingSwipeContent } from './dating-swipe-content';

export const DatingSwipeWrapper: React.FC = () => {
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const geolocation = useAppSelector(s => s.app.profile.geolocation);

  const handlePermission = async () => {
    const currentPermission = await locationPermissionsService.check();
    if (currentPermission === 'blocked' || currentPermission === 'unavailable') {
      setPermission(currentPermission);
      return;
    }
    const newPermission = await locationPermissionsService.request();
    setPermission(newPermission);
  };

  useEffect(() => {
    handlePermission();
  }, []);

  if (permission) {
    if (permission === 'granted') {
      return (
        <>
          <DatingSwipeContent />
        </>
      );
    }

    if (
      [RESULTS.BLOCKED, RESULTS.DENIED, RESULTS.UNAVAILABLE, RESULTS.LIMITED].includes(
        permission,
      ) ||
      geolocation
    ) {
      return <RequireEnalbeLocationSharing onChange={setPermission} />;
    }
  }

  return <></>;
};
