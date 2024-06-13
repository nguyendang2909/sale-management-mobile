import React from 'react';

import { HeaderReports } from './views/header/header-reports';
import { ContentReports } from './views/reports-content';

export const ReportsScreen = () => {
  return (
    <>
      <HeaderReports />
      <ContentReports />
    </>
  );
};
