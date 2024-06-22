import moment from 'moment';
import { SaleStatisticRange, SaleStatisticTimeRangeId } from 'src/types';

export * from './commons.constant';
export * from './components.constant';
export * from './constants';
export * from './data.constant';
export * from './error-messages.constant';
export * from './icons.constant';

export const TIME_FORMATS = {
  DATE: 'YYYY-MM-DD',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
  DATE_ONLY: 'DD',
  HOUR: 'hh:mm',
} as const;

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

export const SALE_STATISTIC_TIME_RANGE_IDS_MAP = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  CURRENT_MONTH: 'current_month',
  LAST_MONTH: 'last_month',
  CURRENT_YEAR: 'current_year',
  LAST_30_DAYS: 'last_30_days',
} as const;

export const SALE_STATISTIC_TIME_RANGE_IDS = Object.values(SALE_STATISTIC_TIME_RANGE_IDS_MAP);

export const SALE_STATISTICS_RANGES_MAP: Record<SaleStatisticTimeRangeId, SaleStatisticRange> = {
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.TODAY]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.TODAY,
    title: 'Hôm nay',
    getRange: () => {
      return {
        startDate: moment().format(TIME_FORMATS.DATE),
        endDate: moment().format(TIME_FORMATS.DATE),
      };
    },
  },
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.YESTERDAY]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.YESTERDAY,
    title: 'Hôm qua',
    getRange: () => {
      return {
        startDate: moment().subtract(1, 'day').format(TIME_FORMATS.DATE),
        endDate: moment().subtract(1, 'day').format(TIME_FORMATS.DATE),
      };
    },
  },
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_MONTH]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_MONTH,
    title: 'Tháng này',
    getRange: () => {
      return {
        startDate: moment().startOf('month').format(TIME_FORMATS.DATE),
        endDate: moment().endOf('month').format(TIME_FORMATS.DATE),
      };
    },
  },
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_MONTH]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_MONTH,
    title: 'Tháng trước',
    getRange: () => {
      return {
        startDate: moment().subtract(1, 'months').startOf('month').format(TIME_FORMATS.DATE),
        endDate: moment().subtract(1, 'months').endOf('month').format(TIME_FORMATS.DATE),
      };
    },
  },
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_YEAR]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_YEAR,
    title: 'Năm nay',
    getRange: () => {
      return {
        startDate: moment().startOf('year').format(TIME_FORMATS.DATE),
        endDate: moment().endOf('year').format(TIME_FORMATS.DATE),
      };
    },
  },
  [SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_30_DAYS]: {
    id: SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_30_DAYS,
    title: '30 ngày',
    getRange: () => {
      return {
        startDate: moment().subtract(1, 'month').format(TIME_FORMATS.DATE),
        endDate: moment().endOf('year').format(TIME_FORMATS.DATE),
      };
    },
  },
};

export const SALE_STATISTICS_RANGES = [
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.TODAY],
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.YESTERDAY],
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_MONTH],
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_MONTH],
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.CURRENT_YEAR],
  SALE_STATISTICS_RANGES_MAP[SALE_STATISTIC_TIME_RANGE_IDS_MAP.LAST_30_DAYS],
];
