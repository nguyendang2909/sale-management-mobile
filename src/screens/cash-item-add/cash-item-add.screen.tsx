import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentCashItemAdd } from './views/content-cash-item-add';
import { HeaderCashItemAdd } from './views/header-cash-item-add';

export const CashItemAddScreen: FC<AppStackScreenProps<'CASH_ITEM_ADD'>> = () => {
  return (
    <>
      <HeaderCashItemAdd />
      <ContentCashItemAdd />
    </>
  );
};
