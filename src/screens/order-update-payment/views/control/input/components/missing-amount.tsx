import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextPrice } from 'src/components/text/text-price';
import { ViewProps } from 'src/types';

export const MissingAmount: FC<ViewProps & { missingAmount: number }> = ({
  missingAmount,
  ...viewProps
}) => {
  if (missingAmount > 0) {
    return (
      <View {...viewProps}>
        <HStack>
          <Text>Còn thiếu: </Text>
          <TextPrice variant="highlight" value={missingAmount}></TextPrice>
        </HStack>
      </View>
    );
  }
  if (missingAmount < 0) {
    return (
      <View {...viewProps}>
        <HStack>
          <Text>Tiền thừa: </Text>
          <TextPrice variant="highlight" value={Math.abs(missingAmount)}></TextPrice>
        </HStack>
      </View>
    );
  }
  return null;
};
