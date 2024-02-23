import React from 'react';
import { LikedMeContent } from 'src/pages/LikedMePage/LikedMeContent';
import { LikedMeHeader } from 'src/pages/LikedMePage/LikedMeHeader';

export const LikedMeScreen: React.FC = () => {
  return (
    <>
      <LikedMeHeader />
      <LikedMeContent />
    </>
  );
};
