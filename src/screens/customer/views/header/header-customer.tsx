import { HStack } from '@gluestack-ui/themed';
import { Header } from 'src/components';
import { IconButtonCall, IconButtonEdit } from 'src/components/icon-button';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderCustomer = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.CUSTOMERS });
  };
  return (
    <>
      <Header
        onLeftPress={handleLeftPress}
        title="Khách hàng"
        RightActionComponent={
          <HStack gap={16}>
            <IconButtonEdit />
            <IconButtonCall />
          </HStack>
        }
      ></Header>
    </>
  );
};
