import { useMemo, useState } from 'react';
import { useCustomers } from 'src/hooks';

export const CustomerList = () => {
  const [searchText, setSearchText] = useState('');

  const {
    data: customers,
    isFetching: isFetchingCustomers,
    refetch: refetchCustomers,
  } = useCustomers();

  const searchedCustomers = useMemo(() => {
    if (!searchText) {
      return customers;
    }
    const regExp = new RegExp(searchText, 'i');

    return customers.filter(
      customer => regExp.test(customer.fullName!) || regExp.test(customer.phoneNumber!),
    );
  }, [customers, searchText]);

  return <></>;
};
