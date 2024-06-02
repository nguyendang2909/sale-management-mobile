import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { ContentData } from 'src/components/content/content-data';
import { SCREENS } from 'src/constants';
import { useSearchProducts } from 'src/hooks';
import { navigate } from 'src/navigations';

import { CreateProductFab } from '../buttons/create-product-fab';
import { ProductList } from './product-list';

export const ProductTab = () => {
  const { data: products, refresh, isRefreshing, isLoading } = useSearchProducts();

  const handlePressAddProduct = () => {
    navigate(SCREENS.PRODUCT_CREATE);
  };

  return (
    <View flex={1}>
      <ContentData
        isLoading={isLoading}
        description="Chưa có sản phẩm nào"
        refresh={refresh}
        hasData={!!products.length}
        isRefreshing={isRefreshing}
        ActionComponent={
          <View>
            <Button size="lg" onPress={handlePressAddProduct}>
              <ButtonText>Thêm sản phẩm</ButtonText>
            </Button>
          </View>
        }
      >
        <ProductList mt={16} products={products} isRefreshing={isRefreshing} refresh={refresh} />
        <CreateProductFab />
      </ContentData>
    </View>
  );
};
