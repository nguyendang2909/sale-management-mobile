import { View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ActionsheetDateRange, ButtonCalendar } from 'src/components';
import {
  useDateRange,
  useDisclose,
  useInit,
  usePaymentsGroupDate,
  usePaymentsOverall,
} from 'src/hooks';

import { PaymentActions } from './actions/payment-actions';
import { PaymentGroupListItem } from './list/payment-group-list-item';
import { PaymentListHeader } from './list/payment-list-header';
import { PaymentOverallSection } from './overall-section/payment-overall-section';

export const ContentPayments = () => {
  const {
    isOpen: isOpenActionsheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionsheet,
  } = useDisclose();
  const { dateRange, setDateRange } = useDateRange();

  const {
    data: paymentsData,
    isRefreshing: isRefreshingPayments,
    refresh: refreshPayments,
  } = usePaymentsGroupDate(dateRange, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: overallData,
    isRefreshing: isRefreshingOverall,
    refresh: refreshOverall,
  } = usePaymentsOverall(dateRange, {
    refetchOnMountOrArgChange: true,
  });

  const { isInit } = useInit();

  const incomeAmount = overallData?.data.incomeAmount || 0;
  const expenditureAmount = overallData?.data.expenditureAmount || 0;
  const paymentAmount = incomeAmount - expenditureAmount;

  const isRefreshing = isRefreshingPayments || isRefreshingOverall;
  const refresh = useCallback(async () => {
    await Promise.all([refreshPayments(), refreshOverall()]);
  }, [refreshPayments, refreshOverall]);

  return (
    <>
      <View flex={1}>
        <FlashList
          refreshing={isRefreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={paymentsData?.data || []}
          keyExtractor={(item, index) => item.date || index.toString()}
          renderItem={({ item }) => {
            return <PaymentGroupListItem paymentItemGroupDate={item} />;
          }}
          estimatedItemSize={100}
          ListHeaderComponent={
            <View>
              <View mt={16} px={16}>
                <ButtonCalendar dateRange={dateRange} onPress={onOpenActionSheet} />
              </View>
              <PaymentOverallSection
                incomeAmount={incomeAmount}
                expenditureAmount={expenditureAmount}
                paymentAmount={paymentAmount}
              />
              <PaymentListHeader />
            </View>
          }
          ListFooterComponent={<View height={100}></View>}
        ></FlashList>
        <PaymentActions px={16} mb={16} />
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
