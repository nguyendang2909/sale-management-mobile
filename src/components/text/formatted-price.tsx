import _ from 'lodash';
import { FC } from 'react';
import { FormattedNumber } from 'react-intl';

export const Price: FC<{ value?: number | null; showCurrency?: boolean }> = ({
  value,
  showCurrency = true,
}) => {
  if (!_.isNumber(value)) {
    return null;
  }
  return (
    <FormattedNumber
      {...(showCurrency ? { style: 'currency' } : undefined)}
      currency="VND"
      value={_.round(value)}
    ></FormattedNumber>
  );
};
