import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { OrderSettingContent } from './views/content';
import { OrderSettingHeader } from './views/header';

type FCProps = AppStackScreenProps<'ORDER_SETTING'>;

export const OrderSettingScreen: FC<FCProps> = () => {
  return (
    <>
      <OrderSettingHeader />
      <OrderSettingContent />
    </>
  );
};
