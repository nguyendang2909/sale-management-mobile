import { Divider, HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { TextPrice } from 'src/components/text/text-price';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';
import { editVariantScreenService } from 'src/services/screens/edit-variant.screen.service';
import { FormParams } from 'src/types';
import { productVariantUtil } from 'src/utils';

export const ProductVariantItem: FC<{
  index: number;
  variant: FormParams.CreateProductVariant;
  setVariant: (index: number, valueProductVariant: FormParams.CreateProductVariant) => void;
  variantsLength: number;
  getProduct: UseFormGetValues<FormParams.CreateProduct>;
}> = ({ variant, setVariant, index, variantsLength, getProduct }) => {
  const optionTitles = variant.option2
    ? variant.option1 + ' - ' + variant.option2
    : variant.option1 || '';

  const stockText = productVariantUtil.getStockText(variant);

  const handleSetVariant = useCallback(
    (value: FormParams.CreateProductVariant) => {
      setVariant(index, value);
    },
    [index, setVariant],
  );

  const handlePress = useCallback(() => {
    const product = getProduct();
    editVariantScreenService.appendSetVariant(handleSetVariant);
    navigate(SCREENS.PRODUCT_VARIANT_EDIT, {
      variant,
      product: { title: product.title },
    });
  }, [getProduct, handleSetVariant, variant]);

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <HStack py={8}>
          <View flexGrow={1} justifyContent="center">
            <Text>{optionTitles}</Text>
          </View>
          <View justifyContent="center">
            <View>
              <Text size="xs" color="$textLight600" textAlign="right">
                {stockText}
              </Text>
            </View>
            <View>
              <TextPrice
                textAlign="right"
                value={variant.promotionalPrice || variant.price}
                color="$warning600"
                fontWeight="$semibold"
              />
            </View>
          </View>
        </HStack>
      </TouchableOpacity>
      {index !== variantsLength - 1 && <Divider />}
    </View>
  );
};
