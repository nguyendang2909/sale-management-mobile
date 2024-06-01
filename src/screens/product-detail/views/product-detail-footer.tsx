import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { AppStore, ViewProps } from 'src/types';

import { DeleteProductButton } from './delete-product-button';

type FCProps = ViewProps & {
  product: AppStore.Product;
  onUpdate: () => void;
  setLoading: (e: boolean) => void;
  isLoading: boolean;
};

export const ProductDetailFooter: FC<FCProps> = ({
  product,
  onUpdate,
  setLoading,
  isLoading,
  ...viewProps
}) => {
  return (
    <View {...viewProps}>
      <View flexDirection="row" columnGap={16}>
        <View flex={1}>
          <DeleteProductButton product={product} setLoading={setLoading} isLoading={isLoading} />
        </View>
        <View flex={1}>
          <Button onPress={onUpdate} disabled={isLoading}>
            <ButtonText>Cập nhật</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};
