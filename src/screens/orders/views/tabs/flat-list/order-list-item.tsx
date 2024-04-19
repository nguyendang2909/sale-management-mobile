import { Divider, HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FormattedTime } from 'react-intl';
import { Price } from 'src/components/text/formatted-price';
import { Entity } from 'src/types';
import { orderUtil } from 'src/utils/order.util';

type FCProps = {
  order: Entity.Order;
};

export const OrderListItem: FC<FCProps> = ({ order }) => {
  const navigation = useNavigation();

  const handlePress = () => {};

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => {
        return (
          <View
            mx={16}
            my={8}
            bg={pressed ? '$backgroundLight200' : '$white'}
            px={16}
            borderWidth={1}
            borderColor="$backgroundLight200"
            borderRadius={8}
          >
            <View p={12}>
              <HStack>
                <View flex={1}>
                  <View>
                    <Text>{order.customer?.fullName ? order.customer?.fullName : 'Khách lẻ'}</Text>
                    <Text>
                      <FormattedTime
                        value={order.createdAt}
                        day="numeric"
                        month="long"
                        // year="numeric"
                        hour="numeric"
                        minute="numeric"
                        hour12={false}
                      />
                    </Text>
                  </View>
                </View>
                <View>
                  <View bgColor="$amber100" p={4} borderRadius={4}>
                    <Text fontSize={14} lineHeight={14} color="$red500">
                      {orderUtil.getOrderStatusTagTranslation(order.status)}
                    </Text>
                  </View>
                </View>
              </HStack>
              <Divider my={8} />
              <View>
                <View>
                  <Text>Tổng cộng</Text>
                </View>
                <View>
                  <Text>
                    <Price value={order.price} />
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};
