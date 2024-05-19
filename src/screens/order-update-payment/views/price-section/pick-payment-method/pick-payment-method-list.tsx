import { HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextCapitalize } from 'src/components';
import { ORDER_PAYMENT_METHOD_ARR } from 'src/constants';
import { useMessages } from 'src/hooks';
import { OrderPaymentMethod, ViewProps } from 'src/types';

export const PickPaymentMethodList: FC<
  ViewProps & { value: OrderPaymentMethod; onChange: (e: OrderPaymentMethod) => void }
> = ({ value, onChange, ...viewProps }) => {
  const { formatMessage } = useMessages();

  return (
    <View {...viewProps}>
      <HStack rowGap={8} columnGap={8}>
        {ORDER_PAYMENT_METHOD_ARR.map(method => {
          const isCheck = method === value;
          return (
            <View
              as={TouchableOpacity}
              // @ts-ignore
              onPress={() => {
                onChange(method);
              }}
              key={method}
              flex={1}
              borderColor={isCheck ? '$blue600' : '$coolGray300'}
              borderWidth={1}
              borderRadius={8}
              bgColor={isCheck ? '$blue100' : undefined}
            >
              <View flex={1} alignItems="center" justifyContent="center">
                <View p={16}>
                  <TextCapitalize>{formatMessage(method)}</TextCapitalize>
                </View>
              </View>
            </View>
          );
        })}
      </HStack>
    </View>
  );
};
