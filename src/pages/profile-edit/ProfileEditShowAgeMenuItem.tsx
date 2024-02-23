import React, { useState } from 'react';
import { MenuItemSwitch } from 'src/components';
import { useAppSelector } from 'src/hooks';
import { ApiRequest } from 'src/types';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileShowAgeMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const currentValue = useAppSelector(state => state.app.profile?.hideAge);

  const [isEnable, setEnable] = useState<boolean | undefined>(currentValue);

  const handleToggle = (e: boolean) => {
    setEnable(e);
    onPress({ hideDistance: e });
  };

  return (
    <>
      <MenuItemSwitch titleTx="Don't show my age" value={isEnable} onToggle={handleToggle} />
    </>
  );
};
