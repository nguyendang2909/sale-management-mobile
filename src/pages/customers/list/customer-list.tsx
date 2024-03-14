import { Icon, SearchIcon, Text, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useState } from 'react';
import { SearchInput } from 'src/components/input/search-input';
import { useCustomers } from 'src/hooks';

import { CustomerListItem } from './customer-list-item';

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

  return (
    <>
      <View px={16} mb={16}>
        <SearchInput onChangeText={setSearchText} />
      </View>
      {searchedCustomers.length ? (
        <FlashList
          showsVerticalScrollIndicator={false}
          refreshing={isFetchingCustomers}
          onRefresh={refetchCustomers}
          numColumns={1}
          data={searchedCustomers}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <CustomerListItem customer={item} />}
          estimatedItemSize={1000}
        ></FlashList>
      ) : (
        <View flex={1} justifyContent="center" alignItems="center" rowGap={16} columnGap={16}>
          <Icon as={SearchIcon} height={80} width={80} />
          <Text textAlign="center">Tên hoặc số điện thoại không có trong danh bạ</Text>
        </View>
      )}
    </>
  );
};
