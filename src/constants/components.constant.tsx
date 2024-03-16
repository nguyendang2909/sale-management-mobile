import { FC } from 'react';
import { CustomersScreen } from 'src/screens/customers/customers.screen';
import { Management } from 'src/screens/management/management';
import { Products } from 'src/screens/products/products';
import { HomeTabParamList } from 'src/types';

import { NAVIGATORS } from './constants';

export const DEFAULT_NAVIGATORS: {
  id: string;
  name: keyof HomeTabParamList;
  title: string;
  screen: FC;
}[] = [
  {
    id: NAVIGATORS.MANAGEMENT,
    name: 'MANAGEMENT',
    title: 'Quản lý',
    screen: Management,
  },
  {
    id: NAVIGATORS.PRODUCT,
    name: 'PRODUCT',
    title: 'Sản phẩm',
    screen: Products,
  },
  {
    id: NAVIGATORS.ORDER,
    name: 'ORDER',
    title: 'Đơn hàng',
    screen: Management,
  },
  {
    id: NAVIGATORS.CUSTOMER,
    name: 'CUSTOMER',
    title: 'Khách hàng',
    screen: CustomersScreen,
  },
];
