import moment, { Moment } from 'moment';
import { AGES, TIME_FORMATS } from 'src/constants';

export const getMinBirthDateTime = (): Date => {
  return moment().subtract(AGES.MIN, 'years').utc().startOf('date').toDate();
};

export const getMaxBirthDateTime = (): Date => {
  return moment().subtract(AGES.MAX, 'years').utc().startOf('date').toDate();
};

export const getAgeFromTime = (time: string): number => {
  return moment().diff(time, 'years');
};

class TimeUtil {
  getDate(currentMoment?: Moment) {
    return moment(currentMoment).format(TIME_FORMATS.DATE);
  }

  getTimeFromDate(date: string) {
    return moment(date, TIME_FORMATS.DATE).toDate();
  }

  getDateNthFromDate(date: string) {
    return moment(date).format(TIME_FORMATS.DATE_ONLY);
  }
}

export const timeUtil = new TimeUtil();
