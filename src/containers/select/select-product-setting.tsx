import { Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ApiRequest, AppStore } from 'src/types';

export const SelectProductSetting: FC<{
  onPress: (e: ApiRequest.UpdateSettings) => void;
  id: keyof AppStore.Setting;
  title: string;
}> = ({ onPress, id, title }) => {
  const handlePress = () => {
    onPress({ [id]: true });
  };

  return (
    <>
      <Button size="sm" variant="outline" onPress={handlePress}>
        <ButtonText>{title}</ButtonText>
      </Button>
    </>
  );
};
