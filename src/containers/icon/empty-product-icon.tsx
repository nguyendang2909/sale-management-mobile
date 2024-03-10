import { Icon } from '@gluestack-ui/themed';
import { FC } from 'react';
import { MaterialCommunityIcons } from 'src/components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FCprops = any;

export const EmptyProductIcon: FC<FCprops> = ({ size }) => {
  return (
    <>
      <Icon
        as={MaterialCommunityIcons}
        color="$coolGray500"
        size={size || 'xl'}
        // @ts-ignore
        name="food-outline"
      />
    </>
  );
};
