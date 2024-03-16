import { AppStackParamList } from 'src/types';

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends AppStackParamList {}
  }
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

export {};
