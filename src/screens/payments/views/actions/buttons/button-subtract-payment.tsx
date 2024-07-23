import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { ArrowUp } from 'lucide-react-native';
import { useCallback } from 'react';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const ButtonSubtractPayment = () => {
  const handlePress = useCallback(() => {
    navigate(SCREENS.PAYMENT_SUBTRACT);
  }, []);

  return (
    <>
      <Button onPress={handlePress} bgColor="$yellow700">
        <ButtonIcon as={ArrowUp}></ButtonIcon>
        <ButtonText>Chi</ButtonText>
      </Button>
    </>
  );
};
