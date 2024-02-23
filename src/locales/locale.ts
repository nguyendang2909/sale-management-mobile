import { createIntl, createIntlCache } from 'react-intl';
import { NativeModules, Platform } from 'react-native';
import { getCountry } from 'react-native-localize';
import { DEFAULT_LANGUAGE } from 'src/constants/constants';
import { TxKey } from 'src/types';

import { translators } from '.';
import { messages } from './messages';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export const language = translators[locale] ? locale : DEFAULT_LANGUAGE;

export const region = getCountry();

const cache = createIntlCache();

const intl = createIntl(
  {
    locale,
    messages: translators[language] || translators.en,
  },
  cache,
);

const { formatMessage: intlFormatMessage } = intl;

export const formatMessage = (e: TxKey) => {
  return intlFormatMessage(messages[e]);
};
