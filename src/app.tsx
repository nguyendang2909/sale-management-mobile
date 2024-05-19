import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Suspense, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import RNBootSplash from 'react-native-bootsplash';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { nativeBaseConfig } from './config/native-base.config';
import { ConnectSocket } from './containers/Connect/ConnectSocket';
import { translators } from './locales';
import { navigationRef } from './navigations/navigation-ref';
import { Main } from './navigators/main';
import { persistor, store } from './store/store';
import { gluestackConfig } from './theme';
import { defaultTheme } from './theme/default-theme';

export default function App() {
  const currentRouteRef = useRef<string>();

  const onNavigationContainerReady = () => {
    currentRouteRef.current = navigationRef.current?.getCurrentRoute()?.name;
    RNBootSplash.hide({ fade: true });
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IntlProvider defaultLocale="vi" locale="vi-VN" messages={translators.vi}>
            <ConnectSocket />
            <SafeAreaProvider>
              <ActionSheetProvider>
                <GluestackUIProvider config={gluestackConfig}>
                  <NativeBaseProvider theme={defaultTheme} config={nativeBaseConfig}>
                    <NavigationContainer
                      ref={navigationRef}
                      onReady={onNavigationContainerReady}
                      onStateChange={async () => {
                        const previousRouteName = currentRouteRef.current;
                        const currentRouteName =
                          navigationRef.current?.getCurrentRoute()?.name || '';
                        if (previousRouteName !== currentRouteName) {
                          currentRouteRef.current = currentRouteName;
                          // await analytics().logScreenView({ screen_name: currentRouteName });
                        }
                      }}
                      linking={{
                        prefixes: ['/'],
                      }}
                    >
                      <Host>
                        <Suspense>
                          <Main />
                          <Toast />
                        </Suspense>
                      </Host>
                    </NavigationContainer>
                  </NativeBaseProvider>
                </GluestackUIProvider>
              </ActionSheetProvider>
            </SafeAreaProvider>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
