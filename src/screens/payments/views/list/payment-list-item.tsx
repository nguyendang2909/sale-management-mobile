import { Divider, HStack, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextPrice } from 'src/components/text/text-price';
import { Entity } from 'src/types';

export const PaymentListItem: FC<{ payment: Entity.Payment; isLast?: boolean }> = ({
  payment,
  isLast,
}) => {
  const { amount = 0 } = payment;

  const isIncome = amount > 0;

  return (
    <>
      <View py={8} px={16}>
        <HStack>
          <View width={150}>
            <Text numberOfLines={1} fontSize="$sm" color="$secondary500">
              {payment.title || 'Chưa phân loại'}
            </Text>
          </View>
          <View flex={1}>
            {!isIncome && (
              <TextPrice
                textAlign="right"
                color="$warning600"
                variant="primary"
                value={Math.abs(amount)}
                showCurrency={false}
                fontSize="$sm"
              ></TextPrice>
            )}
          </View>
          <View flex={1}>
            {isIncome && (
              <TextPrice
                color="$success600"
                variant="primary"
                value={Math.abs(amount)}
                showCurrency={false}
                textAlign="right"
                fontSize="$sm"
              ></TextPrice>
            )}
          </View>
        </HStack>
      </View>
      {!isLast && <Divider />}
    </>
  );
};
