import { Avatar, AvatarFallbackText, HStack, Text, View } from '@gluestack-ui/themed';
import { FC, useMemo } from 'react';
import { Entity, ViewProps } from 'src/types';
import { customerUtil } from 'src/utils/customer.util';

export const OrderCustomerSection: FC<ViewProps & { customer?: Entity.Customer }> = ({
  customer,
  ...viewProps
}) => {
  const customerFullName = useMemo(
    () => customerUtil.getFullName(customer?.fullName),
    [customer?.fullName],
  );

  return (
    <View {...viewProps}>
      <HStack alignItems="center" rowGap={16} columnGap={16}>
        <Avatar height={40} width={40} bgColor="$secondary300" size="md" borderRadius="$full">
          <AvatarFallbackText>{customerFullName}</AvatarFallbackText>
        </Avatar>
        <Text>{customerFullName}</Text>
      </HStack>
    </View>
  );
};
