import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { ArrowDown } from 'lucide-react-native';
import { useCallback } from 'react';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const ButtonAddCashItem = () => {
  const handlePress = useCallback(() => {
    navigate(SCREENS.CASH_ITEM_ADD);
  }, []);

  return (
    <>
      <Button onPress={handlePress} bgColor="$success700">
        <ButtonIcon as={ArrowDown}></ButtonIcon>
        <ButtonText>Thu</ButtonText>
      </Button>
    </>
  );
};
