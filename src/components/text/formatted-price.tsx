import _ from 'lodash';
import { FC } from 'react';
import { FormattedNumber } from 'react-intl';

export const Price: FC<{ value?: number | null }> = ({ value }) => {
  if (!_.isNumber(value)) {
    return null;
  }
  return <FormattedNumber style="currency" currency="VND" value={_.round(value)}></FormattedNumber>;
};
