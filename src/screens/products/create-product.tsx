import { StatusBar, View } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateProductForm } from 'src/pages/create-product/create-product-form';
import { CreateProductHeader } from 'src/pages/create-product/create-product-header';

export const CreateProduct = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <CreateProductHeader />
      {/* 
      //@ts-ignore */}
      <View as={SafeAreaView} edges={['bottom']} flex={1}>
        <CreateProductForm />
      </View>
    </>
  );
};
