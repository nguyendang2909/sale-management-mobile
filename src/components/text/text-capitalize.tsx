import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextProps } from 'src/types';

export const TextCapitalize: FC<
  TextProps & {
    children?: string;
  }
> = ({ children, ...textProps }) => {
  const text = children
    ? children.slice(0, 1).toUpperCase() + children.slice(1, children.length)
    : undefined;

  return <Text {...textProps}>{text}</Text>;
};
