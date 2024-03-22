import { Box, StatusBar } from '@gluestack-ui/themed';
import React from 'react';
import { ProductTabs } from 'src/screens/products/views/product-tabs';

export const ProductsScreen = () => {
  return (
    <>
      <StatusBar barStyle="default" />

      <Box flex={1}>
        <ProductTabs />
        {/* <ProductsFlatList /> */}
      </Box>
    </>
  );
};
