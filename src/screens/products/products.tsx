import { Box, StatusBar, Text } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { useAppSelector } from 'src/hooks';
import { CreateProductFab } from 'src/pages/products/buttons/create-product-fab';
import { ProductTabs } from 'src/pages/products/tabs/product-tabs';
export const Products = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const products = useAppSelector(s => s.product.data);
  const accessToken = useAppSelector(s => s.app.accessToken);
  console.log(222, accessToken);
  console.log(111, products);
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
