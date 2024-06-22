import { createStyle } from '@gluestack-style/react';

export const InputIcon = createStyle({
  props: {
    size: 'md',
    color: '$secondary500',
    _dark: {
      color: '$textDark50',
    },
  },
});
