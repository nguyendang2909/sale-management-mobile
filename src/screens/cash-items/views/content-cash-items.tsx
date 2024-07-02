import { RefreshControl, ScrollView, View } from '@gluestack-ui/themed';
import { useCallback } from 'react';
import { ActionsheetDateRange, ButtonCalendar } from 'src/components';
import { useCashItems, useCashItemsOverall, useDateRange, useDisclose } from 'src/hooks';

import { CashItemActions } from './actions/cash-item-actions';
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
  } = useCashItems(dateRange, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: overallData,
    isRefreshing: isRefreshingOverall,
    refresh: refreshOverall,
  } = useCashItemsOverall(dateRange, {
    refetchOnMountOrArgChange: true,
  });

  const incomeAmount = overallData?.data.incomeAmount || 0;
  const expenditureAmount = overallData?.data.expenditureAmount || 0;
  const cashAmount = incomeAmount - expenditureAmount;

  const isRefreshing = isRefreshingCashItems || isRefreshingOverall;
  const refresh = useCallback(async () => {
    await Promise.all([refreshCashItems(), refreshOverall()]);
  }, [refreshCashItems, refreshOverall]);

  return (
    <>
      <View flex={1} px={16}>
        <ScrollView
          flex={1}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        >
          <View mt={16} px={16}>
            <ButtonCalendar dateRange={dateRange} onPress={onOpenActionSheet} />
          </View>
          <CashItemOverallSection
            incomeAmount={incomeAmount}
            expenditureAmount={expenditureAmount}
            cashAmount={cashAmount}
          />
        </ScrollView>
        <View mb={16}>
          <CashItemActions />
        </View>
      </View>
      <ActionsheetDateRange
        isOpen={isOpenActionsheet}
        onClose={onCloseActionsheet}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </>
  );
};
