import { ScrollView, Text } from '@gluestack-ui/themed';
import { useProducts } from 'src/hooks/useProducts';

export const ProductsScroll = () => {
  const { data } = useProducts();

  console.log(111, data);

  return (
    <>
      <ScrollView flex={1}>
        <Text>asdasd</Text>
      </ScrollView>
    </>
  );
};
