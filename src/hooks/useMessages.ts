import _ from 'lodash';
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

  const formatMessage = (value: TxKey): string => {
    return intl.formatMessage(messages[value]);
  };

  const formatNumber = (value: number | bigint) => {
    return intl.formatNumber(value, {
      currency: 'VND',
    });
  };

  const formatErrorMessage = (error: unknown, defaultMessage?: TxKey) => {
    return intl.formatMessage(getMessageKeyFromResponse(error, defaultMessage));
  };

  return {
    formatMessage,
    formatErrorMessage,
    formatNumber,
  };
};
