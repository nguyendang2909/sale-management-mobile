import { HStack, Text, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import { FC } from 'react';
import { FormattedDate } from 'react-intl';
import { TouchableOpacity } from 'react-native';
import { TextPrice } from 'src/components/text/text-price';
import { useDisclose } from 'src/hooks';
import { Entity } from 'src/types';

import { PaymentListItem } from './payment-list-item';

export const PaymentGroupListItem: FC<{ paymentItemGroupDate: Entity.PaymentGroupDate }> = ({
  paymentItemGroupDate,
}) => {
  const time = moment(paymentItemGroupDate.date).toDate();

  const { isOpen, onToggle } = useDisclose();

  const payments = paymentItemGroupDate.payments || [];

  const paymentsLength = payments.length;

  return (
    <>
      <View>
        <TouchableOpacity onPress={onToggle}>
          <HStack bgColor="$coolGray200" py={8} px={16}>
            <HStack gap={8} width={150}>
              <View>
                <View
                  bgColor="$white"
                  height={40}
                  width={40}
                  borderRadius={8}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text>
                    <FormattedDate value={time} day="2-digit" />
                  </Text>
                </View>
              </View>
              <View>
                <Text fontWeight="$semibold">
                  <FormattedDate value={time} weekday="long" />
                </Text>
                <Text textTransform="capitalize" color="$secondary500" size="xs">
                  <FormattedDate value={time} month="2-digit" year="2-digit" />
                </Text>
              </View>
            </HStack>
            <View flex={1}>
              <TextPrice
                textAlign="right"
                value={paymentItemGroupDate.expenditureAmount}
                showCurrency={false}
                color="$warning600"
                fontWeight="$semibold"
              ></TextPrice>
            </View>
            <View flex={1}>
              <TextPrice
                textAlign="right"
                value={paymentItemGroupDate.incomeAmount}
                showCurrency={false}
                color="$success600"
                fontWeight="$semibold"
              ></TextPrice>
            </View>
          </HStack>
        </TouchableOpacity>
        {isOpen && (
          <View bgColor="$white">
            <FlashList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={paymentItemGroupDate.payments}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item, index }) => {
                return <PaymentListItem payment={item} isLast={index === paymentsLength - 1} />;
              }}
              estimatedItemSize={100}
            ></FlashList>
          </View>
        )}
      </View>
    </>
  );
};
