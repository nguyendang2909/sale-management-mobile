import { ContentCashItems } from './views/content-cash-items';
import { HeaderCashItems } from './views/header/header-cash-items';

export const CashItemScreen = () => {
  return (
    <>
      <HeaderCashItems />
      <ContentCashItems />
    </>
  );
};
