import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonText,
  HStack,
  View,
} from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ViewFooter } from 'src/components';
import { SALE_STATISTICS_RANGES, SALE_STATISTICS_RANGES_MAP, TIME_FORMATS } from 'src/constants';
import { FormParams, SaleStatisticTimeRangeId } from 'src/types';
import * as Yup from 'yup';

import { ButtonTagTimeRangeId } from './controller/form/button-tag-time-range-id';
import { InputPickDate } from './controller/form/input-date';

export const SaleReportActionSheet: FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  dateRange: FormParams.DateRange;
  setDateRange: (e: FormParams.DateRange) => void;
}> = ({ isOpen, onClose, dateRange, setDateRange }) => {
  const { reset, setValue, watch, getValues } = useForm<FormParams.DateRange>({
    defaultValues: dateRange,
    resolver: yupResolver(
      Yup.object({
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
      }),
    ),
  });

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  useEffect(() => {
    reset(dateRange);
  }, [reset, dateRange]);

  const handleChangeStatisticRange = (saleStatisticId: SaleStatisticTimeRangeId) => {
    const saleStatistic = SALE_STATISTICS_RANGES_MAP[saleStatisticId];
    const pickedDateRange = saleStatistic.getRange();
    setValue('startDate', pickedDateRange.startDate);
    setValue('endDate', pickedDateRange.endDate);
    setDateRange({
      startDate: pickedDateRange.startDate,
      endDate: pickedDateRange.endDate,
    });
    onClose();
  };

  const handlePressApply = () => {
    const formValues = getValues();
    setDateRange({
      startDate: formValues.startDate,
      endDate: formValues.endDate,
    });
    onClose();
  };

  const handleReset = () => {
    reset(dateRange);
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          h="$72"
          zIndex={999}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View py={16}>
            <View flexDirection="row" flexWrap="wrap">
              <>
                {SALE_STATISTICS_RANGES.map(item => {
                  return (
                    <View key={item.id} width="50%" p={8}>
                      <ButtonTagTimeRangeId
                        statisticRange={item}
                        dateRange={{
                          startDate: startDateValue,
                          endDate: endDateValue,
                        }}
                        onPress={handleChangeStatisticRange}
                      />
                    </View>
                  );
                })}
              </>
            </View>
            <View mt={16} px={8}>
              <InputPickDate
                label="Từ"
                value={startDateValue}
                onChange={(e: string) => {
                  setValue('startDate', e);
                }}
                maxTime={moment(endDateValue, TIME_FORMATS.DATE).toDate()}
              />
              <InputPickDate
                mt={16}
                label="Đến"
                value={endDateValue}
                onChange={(e: string) => {
                  setValue('endDate', e);
                }}
                minTime={moment(startDateValue, TIME_FORMATS.DATE).toDate()}
                maxTime={moment(endDateValue, TIME_FORMATS.DATE).toDate()}
              />
            </View>
          </View>
          <ViewFooter py={16} isShadow={true}>
            <HStack w="$full" gap={16}>
              <View flex={1}>
                <Button variant="outline" onPress={handleReset}>
                  <ButtonText>Thiết đặt lại</ButtonText>
                </Button>
              </View>
              <View flex={1}>
                <Button onPress={handlePressApply}>
                  <ButtonText>Áp dụng</ButtonText>
                </Button>
              </View>
            </HStack>
          </ViewFooter>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
