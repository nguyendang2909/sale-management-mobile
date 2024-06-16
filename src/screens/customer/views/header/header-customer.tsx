import { HStack } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header } from 'src/components';
import { IconButtonCall, IconButtonEdit } from 'src/components/icon-button';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';
import { AppStore } from 'src/types';
import { phoneUtil } from 'src/utils/phone.util';

export const HeaderCustomer: FC<{ customer: AppStore.Customer }> = ({ customer }) => {
  const phone = customer.phoneNumber
    ? phoneUtil.getFullPhoneNumber({
        phoneCode: customer.phoneCode,
        phoneNumber: customer.phoneNumber,
      })
    : undefined;

  console.log(111, phone);

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
            <IconButtonCall phone={phone} />
          </HStack>
        }
      ></Header>
    </>
  );
};
