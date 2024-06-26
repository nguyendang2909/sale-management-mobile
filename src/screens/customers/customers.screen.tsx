import { Box, Button, ButtonText, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Header } from 'src/components';
import { ContentData } from 'src/components/content/content-data';
import { ContentNoData } from 'src/components/content/content-no-data';
import { SearchInput } from 'src/components/input/search-input';
import { useDisclose, useSearchCustomers } from 'src/hooks';

import { CreateCustomerFab } from './views/create/create-customer-fab';
import { ModalCreateCustomer } from './views/create/modal/modal-create-customer';
import { CustomerListItem } from './views/list/customer-list-item';

export const CustomersScreen = () => {
  const { searchText, setSearchText, isRefreshing, refresh, data, isLoading, originalData } =
    useSearchCustomers();

  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclose();

  return (
    <>
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
          title="Chưa có thông tin khách hàng"
          ActionComponent={
            <>
              <Button onPress={onOpenCreateModal}>
                <ButtonText>Thêm khách hàng</ButtonText>
              </Button>
            </>
          }
          hasData={!!originalData.length}
        >
          {data.length ? (
            <FlashList
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              onRefresh={refresh}
              numColumns={1}
              data={data}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item }) => <CustomerListItem customer={item} />}
              estimatedItemSize={1000}
            ></FlashList>
          ) : (
            <ContentNoData description="Tên hoặc số điện thoại không có trong danh bạ" />
          )}
          <CreateCustomerFab onOpen={onOpenCreateModal} />
        </ContentData>
      </Box>

      <ModalCreateCustomer onClose={onCloseCreateModal} isOpen={isOpenCreateModal} />
    </>
  );
};
