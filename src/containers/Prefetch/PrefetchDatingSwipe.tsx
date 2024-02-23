import React from 'react';
import { useRefreshNearbyProfilesQuery, useRefreshSwipeProfilesQuery } from 'src/api';
import { useAppSelector } from 'src/hooks';

export const PrefetchDatingSwipe: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.swipeUser.info.lastRefreshedAt);

  useRefreshSwipeProfilesQuery(undefined, {
    skip: !!lastRefreshedAt,
  });

  useRefreshNearbyProfilesQuery({});

  return <></>;
};
