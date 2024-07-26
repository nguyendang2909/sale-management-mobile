import { Divider, HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { TextPrice } from 'src/components/text/text-price';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { editSkuScreenService } from 'src/services/screens/edit-sku.screen.service';
import { FormParams } from 'src/types';
import { skuUtil } from 'src/utils';

export const SkuItem: FC<{
  index: number;
  sku: FormParams.CreateProductSku;
  setSku: (index: number, skuValue: FormParams.CreateProductSku) => void;
  specificationsMap: Record<string, FormParams.CreateProductSpecification>;
  skusLength: number;
  getProduct: UseFormGetValues<FormParams.CreateProduct>;
}> = ({ sku, setSku, specificationsMap, index, skusLength, getProduct }) => {
  const specificationIds = sku.specificationIds;
  const specifications = specificationIds.map(specificationId => {
    return specificationsMap[specificationId];
  });

  const specificationTitles = specifications.map(e => e?.title).join(' - ');

  const stockText = skuUtil.getStockText(sku);

  const handleSetSku = useCallback(
    (value: FormParams.CreateProductSku) => {
      setSku(index, value);
    },
    [index, setSku],
  );

  const handlePress = useCallback(() => {
    const product = getProduct();
    editSkuScreenService.appendSetSku(handleSetSku);
    navigate(SCREENS.SKU_EDIT, {
      sku,
      product: { title: product.title },
    });
  }, [getProduct, handleSetSku, sku]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <HStack py={8}>
          <View flexGrow={1} justifyContent="center">
            <Text>{specificationTitles}</Text>
          </View>
          <View justifyContent="center">
            <View>
              <Text size="xs" color="$textLight600">
                {stockText}
              </Text>
            </View>
            <View>
              <TextPrice
                value={sku.promotionalPrice || sku.price}
                color="$warning600"
                fontWeight="$semibold"
              />
            </View>
          </View>
        </HStack>
      </TouchableOpacity>
      {index !== skusLength - 1 && <Divider />}
    </View>
  );
};
