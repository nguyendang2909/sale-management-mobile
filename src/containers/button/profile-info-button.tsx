import React from 'react';
import { InfoIconButton } from 'src/components/button';

type FCProps = {
  onPress: () => void;
};

export const ProfileInfoButton: React.FC<FCProps> = ({ onPress }) => {
  const handlePress = () => {
    onPress();
  };

  return <InfoIconButton onPress={handlePress} />;
};
