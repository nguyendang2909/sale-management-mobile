import React from 'react';
import { useRefreshNearbyProfilesQuery } from 'src/api';
import { useAppSelector } from 'src/hooks';

export const PrefetchDatingNearby: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);

  useRefreshNearbyProfilesQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
