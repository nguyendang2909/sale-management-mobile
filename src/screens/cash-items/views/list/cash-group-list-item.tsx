import { HStack, Text, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import moment from 'moment';
import { FC } from 'react';
import { FormattedDate } from 'react-intl';
import { TouchableOpacity } from 'react-native';
import { TextPrice } from 'src/components/text/text-price';
import { useDisclose } from 'src/hooks';
import { Entity } from 'src/types';

import { CashListItem } from './cash-list-item';

export const CashGroupListItem: FC<{ cashItemGroupDate: Entity.CashItemGroupDate }> = ({
  cashItemGroupDate,
}) => {
  const time = moment(cashItemGroupDate.date).toDate();

  const { isOpen, onToggle } = useDisclose();

  const cashItems = cashItemGroupDate.cashItems || [];

  const cashItemLength = cashItems.length;

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
                value={cashItemGroupDate.expenditureAmount}
                showCurrency={false}
                color="$warning600"
                fontWeight="$semibold"
              ></TextPrice>
            </View>
            <View flex={1}>
              <TextPrice
                textAlign="right"
                value={cashItemGroupDate.incomeAmount}
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
              data={cashItemGroupDate.cashItems}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item, index }) => {
                return <CashListItem cashItem={item} isLast={index === cashItemLength - 1} />;
              }}
              estimatedItemSize={100}
            ></FlashList>
          </View>
        )}
      </View>
    </>
  );
};
