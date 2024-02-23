import React from 'react';
import { LikeIconButton } from 'src/components/button';

type FCProps = {
  onPress?: (e?: boolean) => void;
};

export const SendSwipeLikeButton: React.FC<FCProps> = ({ onPress }) => {
  const handleSendLike = async () => {
    if (onPress) {
      onPress();
    }
  };

  return <LikeIconButton onPress={handleSendLike} />;
};
