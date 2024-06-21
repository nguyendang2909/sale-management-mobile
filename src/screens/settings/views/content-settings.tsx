import { ScrollView, View } from '@gluestack-ui/themed';
import { LogoutButton } from 'src/containers/button/logout-button';

import { DataManagement } from './data-management/data-management';
import { ProductManagement } from './product-management/product-management';
import { ShopManagement } from './shop-management/shop-management';

export const ContentSettings = () => {
  return (
    <>
      <ScrollView>
        <ShopManagement mt={16} />
        <ProductManagement mt={16} />
        <DataManagement mt={16} />

        <View mt={24}>
          <View px={12}>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
