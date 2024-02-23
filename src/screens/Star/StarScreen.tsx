import React from 'react';
import { Header } from 'src/components';
import { StarBody } from 'src/pages/star/StarBody';

export const StarScreen: React.FC = () => {
  return (
    <>
      <Header titleTx="AppName" />

      <StarBody />
    </>
  );
};
