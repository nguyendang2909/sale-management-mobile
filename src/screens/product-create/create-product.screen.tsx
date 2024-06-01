import { StatusBar, View } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateProductForm } from 'src/screens/product-create/views/create-product-form';
import { HeaderProductCreate } from 'src/screens/product-create/views/create-product-header';

export const ProductCreateScreen = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <HeaderProductCreate />

      <View
        as={SafeAreaView}
        // @ts-ignore
        edges={['bottom']}
        flex={1}
      >
        <CreateProductForm />
      </View>
    </>
  );
};
