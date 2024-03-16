import { Box, StatusBar, View } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { ProductTabs } from 'src/pages/products/product-tabs';

export const Products = () => {
  return (
    <>
      <View></View>
      <StatusBar barStyle="default" />
      <Header
        title="Sản phẩm"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <Box flex={1}>
        <ProductTabs />
        {/* <ProductsFlatList /> */}
      </Box>
    </>
  );
};
