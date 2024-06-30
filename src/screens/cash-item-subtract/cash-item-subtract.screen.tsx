import { FC } from 'react';
import { AppStackScreenProps } from 'src/navigators/main.stack';

import { ContentCashItemSubtract } from './views/content-cash-item-subtract';
import { HeaderCashItemSubtract } from './views/header-cash-item-subtract';

export const CashItemSubtractScreen: FC<AppStackScreenProps<'CASH_ITEM_SUBTRACT'>> = () => {
  return (
    <>
      <HeaderCashItemSubtract />
      <ContentCashItemSubtract />
    </>
  );
};
