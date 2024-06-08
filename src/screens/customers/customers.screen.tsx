import { Box, StatusBar, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Header } from 'src/components';
import { ContentData } from 'src/components/content/content-data';
import { ContentNoData } from 'src/components/content/content-no-data';
import { SearchInput } from 'src/components/input/search-input';
import { useSearchCustomers } from 'src/hooks';

import { CreateCustomerFab } from './views/create/create-customer-fab';
import { CustomerListItem } from './views/list/customer-list-item';

export const CustomersScreen = () => {
  const { searchText, setSearchText, isRefreshing, refresh, data, isLoading, originalData } =
    useSearchCustomers();

  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        title="Khách hàng"
        RightActionComponent={
          <>
            <View pr={8}>
              <View
                justifyContent="flex-end"
                alignItems="center"
                flexDirection="row"
                columnGap={8}
                rowGap={8}
              ></View>
            </View>
          </>
        }
      >
        <SearchInput mb={16} px={16} value={searchText} onChangeText={setSearchText} />
      </Header>
      <Box flex={1}>
        <ContentData
          isLoading={isLoading}
          refresh={refresh}
          isRefreshing={isRefreshing}
          title="Không tìm thấy khách hàng"
          hasData={!!originalData.length}
        >
          {data.length ? (
            <FlashList
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              onRefresh={refresh}scree
              numColumns={1}
              data={data}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item }) => <CustomerListItem customer={item} />}
              estimatedItemSize={1000}
            ></FlashList>
          ) : (
            <ContentNoData description="Tên hoặc số điện thoại không có trong danh bạ" />
          )}
        </ContentData>
      </Box>

      <CreateCustomerFab />
    </>
  );
};
