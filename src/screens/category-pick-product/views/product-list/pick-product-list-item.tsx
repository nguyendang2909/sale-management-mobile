import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
  HStack,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProductPrices } from 'src/components/text/product-prices';
import { ProductIconBox } from 'src/containers/icon/product-icon-box';
import { AppStore } from 'src/types';

type FCProps = {
  product: AppStore.Product;
  onPress: (id: string) => void;
};

export const PickProductListItem: FC<FCProps> = ({ product, onPress }) => {
  const imagePath = _.first(product.images);
  const [isChecked, setChecked] = useState<boolean>(false);

  const handlePress = () => {
    setChecked(prev => !prev);
    onPress(product.id);
  };

  const handleChange = (e: boolean) => {
    setChecked(prev => !prev);
    onPress(product.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View px={16} bgColor="$white">
        <HStack columnGap={8} borderBottomWidth={1} borderColor="$backgroundLight200" py={8}>
          <View alignItems="center" justifyContent="center">
            <Checkbox
              aria-label="product"
              value=""
              isChecked={isChecked}
              defaultIsChecked={false}
              size="md"
              isInvalid={false}
              isDisabled={false}
              onChange={handleChange}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </View>
          <View>
            <ProductIconBox url={imagePath?.path} />
          </View>
          <VStack>
            <View height={22}>
              <Text lineHeight={22} numberOfLines={1}>
                {product.title}
              </Text>
            </View>
            <View height={21}>
              <Text lineHeight={21}>{''}</Text>
            </View>
            <View height={21}>
              <Text lineHeight={21}>
                <ProductPrices product={product} />
              </Text>
            </View>
          </VStack>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};
