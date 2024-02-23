import { Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextProps, TextStyle } from 'react-native';
import { getAgeFromTime } from 'src/utils';

type AgeTextProps = {
  birthday: string;
  hideAge?: boolean;
} & TextProps &
  TextStyle;

export const AgeText: FC<AgeTextProps> = ({ birthday, hideAge, ...textProps }) => {
  if (hideAge) {
    return <></>;
  }
  const age = getAgeFromTime(birthday);
  // @ts-ignore
  return <Text {...textProps}>{age}</Text>;
};
