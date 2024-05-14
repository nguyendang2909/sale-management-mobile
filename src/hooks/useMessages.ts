import _ from 'lodash';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { messages } from 'src/locales/messages';
import { TxKey, TxKeyValue } from 'src/types';

export const getMessageKeyFromResponse = (
  error: unknown,
  defaultMessage: TxKey = 'Oops, something went wrong. Please try again.',
): TxKeyValue => {
  const message: TxKey = _.get(error, 'data.message') || defaultMessage;
  if (message && messages[message]) {
    return messages[message];
  }
  if (messages[defaultMessage]) {
    return messages[defaultMessage];
  }
  return messages['Oops, something went wrong. Please try again.'];
};

export const useMessages = () => {
  const intl = useIntl();

  const formatMessage = useCallback(
    (value: TxKey): string => {
      return intl.formatMessage(messages[value]);
    },
    [intl],
  );

  const formatNumber = useCallback(
    (value: number | bigint) => {
      return intl.formatNumber(value, {
        currency: 'VND',
      });
    },
    [intl],
  );

  const formatErrorMessage = useCallback(
    (error: unknown, defaultMessage?: TxKey) => {
      return intl.formatMessage(getMessageKeyFromResponse(error, defaultMessage));
    },
    [intl],
  );

  return {
    formatMessage,
    formatErrorMessage,
    formatNumber,
    locale: intl.locale,
  };
};
