import { HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewProps } from 'src/types';

export const PaymentListHeader: FC<ViewProps> = () => {
  return (
    <View mt={16} px={16}>
      <HStack>
        <View width={150}></View>
        <View flex={1}>
          <Text textAlign="right" color="$secondary500">
            Chi
          </Text>
        </View>
        <View flex={1}>
          <Text textAlign="right" color="$secondary500">
            Thu
          </Text>
        </View>
      </HStack>
    </View>
  );
};
