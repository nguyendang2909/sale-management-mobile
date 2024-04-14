import { FC } from 'react';
import { AppStackScreenProps } from 'src/types';

import { OrderSettingContent } from './views/content';
import { OrderSettingHeader } from './views/header';

type FCProps = AppStackScreenProps<'ORDER_SETTING'>;

export const OrderSettingScreen: FC<FCProps> = props => {
  return (
    <>
      <OrderSettingHeader />
      <OrderSettingContent />
    </>
  );
};
