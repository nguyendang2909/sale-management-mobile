import messages from 'src/locales/messages';

export * from './app-store.type';
export * from './common.type';
export * from './configs.type';
export * from './data.type';
export * from './entities.type';
export * from './fe.type';
export * from './form-params.type';
export * from './navigation.type';
export * from './socket-request.type';
export * from './socket-response.type';

export type AppMessage = typeof messages;

export type TxKey = keyof AppMessage;

export type TxKeyValue = AppMessage[TxKey];

export type ChatUser = {
  _id: string;
  name?: string;
  avatar?: string;
};

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your redux to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
