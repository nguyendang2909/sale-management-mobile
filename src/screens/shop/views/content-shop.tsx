import { View } from '@gluestack-ui/themed';
import { useUpdateShopMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';

export const ContentShop = () => {
  const [updateShop, { isLoading: isUpdatingShop }] = useUpdateShopMutation();

  const isLoading = isUpdatingShop;

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <View flex={1}></View>
    </>
  );
};
