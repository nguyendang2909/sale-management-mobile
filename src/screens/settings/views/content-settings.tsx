import { ScrollView, View } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { useDeleteMeMutation } from 'src/api/me.api';
import { LoadingOverlay } from 'src/components';
import { LogoutButton } from 'src/containers/button/logout-button';

import { DataManagement } from './data-management/data-management';
import { ProductManagement } from './product-management/product-management';
import { ShopManagement } from './shop-management/shop-management';

export const ContentSettings = () => {
  const [deleteMe, { isLoading: isLoadingDeleteMe }] = useDeleteMeMutation();

  const isLoading = isLoadingDeleteMe;

  const handleDeleteAccount = useCallback(async () => {
    await deleteMe().unwrap();
  }, [deleteMe]);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <ScrollView>
        <ShopManagement mt={16} />
        <ProductManagement mt={16} />
        <DataManagement mt={16} onDeleteAccount={handleDeleteAccount} />

        <View mt={24}>
          <View px={12}>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
