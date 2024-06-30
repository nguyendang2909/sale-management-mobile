import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { ArrowDown } from 'lucide-react-native';
import { useCallback } from 'react';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const ButtonSubtractCashItem = () => {
  const handlePress = useCallback(() => {
    navigate(SCREENS.CASH_ITEM_SUBTRACT);
  }, []);

  return (
    <>
      <Button onPress={handlePress} bgColor="$yellow700">
        <ButtonIcon as={ArrowDown}></ButtonIcon>
        <ButtonText>Chi</ButtonText>
      </Button>
    </>
  );
};
