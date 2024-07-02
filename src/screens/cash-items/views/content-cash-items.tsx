import { HStack, Text, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ActionsheetDateRange, ButtonCalendar } from 'src/components';
import {
  useCashItemsGroupDate,
  useCashItemsOverall,
  useDateRange,
  useDisclose,
  useInit,
} from 'src/hooks';

import { CashItemActions } from './actions/cash-item-actions';
import { CashGroupListItem } from './list/cash-group-list-item';
import { CashItemOverallSection } from './overall-section/cash-item-overall-section';

export const ContentCashItems = () => {
  const {
    isOpen: isOpenActionsheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();
  const { dateRange, setDateRange } = useDateRange();

  const {
    data: cashItemsData,
    isRefreshing: isRefreshingCashItems,
    refresh: refreshCashItems,
  } = useCashItemsGroupDate(dateRange, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: overallData,
    isRefreshing: isRefreshingOverall,
    refresh: refreshOverall,
  } = useCashItemsOverall(dateRange, {
    refetchOnMountOrArgChange: true,
  });

  const { isInit } = useInit();

  const incomeAmount = overallData?.data.incomeAmount || 0;
  const expenditureAmount = overallData?.data.expenditureAmount || 0;
  const cashAmount = incomeAmount - expenditureAmount;

  const isRefreshing = isRefreshingCashItems || isRefreshingOverall;
  const refresh = useCallback(async () => {
    await Promise.all([refreshCashItems(), refreshOverall()]);
  }, [refreshCashItems, refreshOverall]);

  return (
    <>
      <View flex={1}>
        <FlashList
          refreshing={isRefreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={cashItemsData?.data || []}
          keyExtractor={(item, index) => item.date || index.toString()}
          renderItem={({ item }) => {
            return <CashGroupListItem cashItemGroupDate={item} />;
          }}
          estimatedItemSize={100}
          ListHeaderComponent={
            <View>
              <View mt={16} px={16}>
                <ButtonCalendar dateRange={dateRange} onPress={onOpenActionSheet} />
              </View>
              <CashItemOverallSection
                incomeAmount={incomeAmount}
                expenditureAmount={expenditureAmount}
                cashAmount={cashAmount}
              />
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
            </View>
          }
          ListFooterComponent={<View height={100}></View>}
        ></FlashList>
        <CashItemActions px={16} mb={16} />
      </View>
      {isInit && (
        <ActionsheetDateRange
          isOpen={isOpenActionsheet}
          onClose={onCloseActionsheet}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}
    </>
  );
};
