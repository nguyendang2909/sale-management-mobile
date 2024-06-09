import React, { FC } from 'react';

import { ContentManagement } from './views/content-management';
import { HeaderManagement } from './views/header/header-management';

export const ManagementScreen: FC = () => {
  return (
    <>
      <HeaderManagement />
      <ContentManagement />
    </>
  );
};
