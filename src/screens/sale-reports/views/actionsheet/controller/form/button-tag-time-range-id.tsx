import { FC } from 'react';
import { ButtonTag } from 'src/components/button/button-tag';
import { SaleStatisticRange, SaleStatisticTimeRangeId } from 'src/types';

export const ButtonTagTimeRangeId: FC<{
  statisticRange: SaleStatisticRange;
  onPress: (e: SaleStatisticTimeRangeId) => void;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}> = ({ onPress, dateRange, statisticRange }) => {
  const handlePress = () => {
    onPress(statisticRange.id);
  };

  const { startDate, endDate } = statisticRange.getRange();

  return (
    <ButtonTag
      title={statisticRange.title}
      value={statisticRange.id}
      onChange={handlePress}
      isEnabled={startDate === dateRange.startDate && endDate === dateRange.endDate}
    ></ButtonTag>
  );
};
