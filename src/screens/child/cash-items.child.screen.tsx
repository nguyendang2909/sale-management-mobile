import { ContentCashItems } from '../cash-items/views/content-cash-items';
import { HeaderCashItems } from '../cash-items/views/header/header-cash-items';

export const CashItemChild = () => {
  return (
    <>
      <HeaderCashItems allowBack />
      <ContentCashItems />
    </>
  );
};
