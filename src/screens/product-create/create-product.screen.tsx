import { View } from '@gluestack-ui/themed';
import { CreateProductForm } from 'src/screens/product-create/views/create-product-form';
import { HeaderProductCreate } from 'src/screens/product-create/views/create-product-header';

export const ProductCreateScreen = () => {
  return (
    <>
      <HeaderProductCreate />

      <View flex={1}>
        <CreateProductForm />
      </View>
    </>
  );
};
