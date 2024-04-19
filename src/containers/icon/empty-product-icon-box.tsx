import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC } from 'react';
import { sizeUtil } from 'src/utils/box-size.util';

import { EmptyProductIcon } from './empty-product-icon';

type FCprops = ComponentProps<typeof View> & { size?: 'xl' | 'md' };

export const EmptyProductIconBox: FC<FCprops> = ({ size, ...props }) => {
  return (
    <View
      {...props}
      {...sizeUtil.getProps(size)}
      borderRadius={props.borderRadius || 4}
      borderColor={props.borderColor || '$backgroundLight200'}
      borderWidth={props.borderWidth || 1}
      bgColor={props.bgColor || '$coolGray100'}
      alignItems={props.alignItems || 'center'}
      justifyContent={props.justifyContent || 'center'}
    >
      <EmptyProductIcon size="xl" />
    </View>
  );
};
