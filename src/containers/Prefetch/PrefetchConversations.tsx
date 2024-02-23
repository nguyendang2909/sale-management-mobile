import React from 'react';
import { useRefreshConversationsQuery } from 'src/api';
import { useAppSelector } from 'src/hooks';

export const PrefetchConversations: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.match.infoConversations.lastRefreshedAt);

  useRefreshConversationsQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
