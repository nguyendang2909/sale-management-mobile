import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewFooter } from 'src/components';
import { AppStore, ViewProps } from 'src/types';

import { DeleteProductButton } from './delete-product-button';

type FCProps = ViewProps & {
  product: AppStore.Product;
  onUpdate: () => void;
  setLoading: (e: boolean) => void;
  isLoading: boolean;
  isDirty: boolean;
};

export const ProductDetailFooter: FC<FCProps> = ({
  product,
  onUpdate,
  setLoading,
  isLoading,
  isDirty,
  ...viewProps
}) => {
  return (
    <ViewFooter {...viewProps}>
      <View flexDirection="row" columnGap={16}>
        <View flex={1}>
          <DeleteProductButton product={product} setLoading={setLoading} isLoading={isLoading} />
        </View>
        <View flex={1}>
          <Button onPress={onUpdate} isDisabled={isLoading || !isDirty}>
            <ButtonText>Cập nhật</ButtonText>
          </Button>
        </View>
      </View>
    </ViewFooter>
  );
};
