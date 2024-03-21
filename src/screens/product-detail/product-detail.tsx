import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackScreenProps } from 'src/types';

import { ProductDetailForm } from './components/product-detail-form';
import { ProductDetailHeader } from './components/product-detail-header';

type FCProps = AppStackScreenProps<'PRODUCT_DETAIL'>;

export const ProductDetailScreen: FC<FCProps> = props => {
  return (
    <>
      <ProductDetailHeader />
      {/* 
      //@ts-ignore */}
      <View as={SafeAreaView} edges={['bottom']} flex={1}>
        <ProductDetailForm detail={props.route.params.detail} />
      </View>
    </>
  );
}
