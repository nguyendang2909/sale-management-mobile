import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { Calendar, ChevronDown } from 'lucide-react-native';
import moment from 'moment';
import { FC, useMemo } from 'react';
import { FormattedDate } from 'react-intl';
import { SALE_STATISTICS_RANGES, TIME_FORMATS } from 'src/constants';
import { FormParams } from 'src/types';
import { timeUtil } from 'src/utils';

export const ButtonCalendar: FC<{
  onPress: () => void;
  dateRange: FormParams.DateRange;
}> = ({ onPress, dateRange }) => {
  const saleStatistics = useMemo(() => {
    return SALE_STATISTICS_RANGES.map(e => {
      const statisticDateRange = e.getRange();
      return {
        title: e.title,
        dateRange: {
          startDate: statisticDateRange.startDate,
          endDAte: statisticDateRange.endDate,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment().format(TIME_FORMATS.DATE)]);

  const saleStatistic = useMemo(() => {
    return saleStatistics.find(e => {
      return (
        e.dateRange.startDate === dateRange.startDate && e.dateRange.endDAte === dateRange.endDate
      );
    });
  }, [dateRange.endDate, dateRange.startDate, saleStatistics]);

  const startTime = timeUtil.getTimeFromDate(dateRange.startDate);
  const endTime = timeUtil.getTimeFromDate(dateRange.endDate);

  return (
    <>
      <Button onPress={onPress} variant="outline" size="xs">
        <ButtonIcon as={Calendar} mr={8}></ButtonIcon>
        {saleStatistic ? (
          <ButtonText>{saleStatistic.title}</ButtonText>
        ) : (
          <ButtonText>
            <FormattedDate value={startTime}></FormattedDate> -{' '}
            <FormattedDate value={endTime}></FormattedDate>
          </ButtonText>
        )}
        <ButtonIcon as={ChevronDown} ml={8}></ButtonIcon>
      </Button>
    </>
  );
};
