import { useMemo, useState } from 'react';
import { useFetchAllCustomersQuery } from 'src/api';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchCustomers = () => {
  const [searchText, setSearchText] = useState('');
  const customers = useAppSelector(s => s.customer.data);
  const query = useFetchAllCustomersQuery({});
  const refreshQuery = useRefreshQuery(query.refetch);
  const searchTextMemo = useMemo(() => searchText, [searchText]);
  const data = useMemo(() => {
    if (!searchText) {
      return customers;
    }
    const regExp = new RegExp(searchText, 'i');
    return customers.filter(
      customer =>
        (customer.fullName && regExp.test(customer.fullName)) ||
        (customer.phoneNumber && regExp.test(customer.phoneNumber!)) ||
        (customer.phoneCode && regExp.test(customer.phoneCode!)),
    );
  }, [customers, searchText]);

  return {
    ...query,
    ...refreshQuery,
    data,
    searchText: searchTextMemo,
    setSearchText,
  };
};
