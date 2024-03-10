import { Box, StatusBar, Text } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { CreateProductFab } from 'src/pages/products/buttons/create-product-fab';
import { ProductTabs } from 'src/pages/products/tabs/product-tabs';
export const Products = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        title="Sản phẩm"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <Box flex={1}>
        <Text>asdasds</Text>
        <ProductTabs />
        {/* <ProductsFlatList /> */}

        <CreateProductFab />
      </Box>
    </>
  );
};
