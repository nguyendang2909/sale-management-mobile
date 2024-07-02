import moment from 'moment';
import { useState } from 'react';
import { TIME_FORMATS } from 'src/constants';
import { FormParams } from 'src/types';

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState<FormParams.DateRange>({
    startDate: moment().startOf('month').format(TIME_FORMATS.DATE),
    endDate: moment().endOf('month').format(TIME_FORMATS.DATE),
  });

  return { dateRange, setDateRange };
};
