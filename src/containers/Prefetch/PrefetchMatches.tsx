import React from 'react';
import { useRefreshMatchesQuery } from 'src/api';
import { useAppSelector } from 'src/hooks';

export const PrefetchMatches: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.match.infoMatches.lastRefreshedAt);

  useRefreshMatchesQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
