import { StatusBar } from '@gluestack-ui/themed';
import { Header } from 'src/components';

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
    </>
  );
};
