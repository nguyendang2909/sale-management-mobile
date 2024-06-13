import React from 'react';

import { HeaderReports } from '../reports/views/header/header-reports';
import { ContentReports } from '../reports/views/reports-content';

export const ReportsChildScreen = () => {
  return (
    <>
      <HeaderReports allowBack />
      <ContentReports />
    </>
  );
};
