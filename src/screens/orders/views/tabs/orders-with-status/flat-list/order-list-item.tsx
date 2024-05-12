import { Divider, HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FormattedTime } from 'react-intl';
import { Price } from 'src/components/text/formatted-price';
import { SCREENS } from 'src/constants';
import { Entity } from 'src/types';

type FCProps = {
  order: Entity.Order;
};

export const OrderListItem: FC<FCProps> = ({ order }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(SCREENS.ORDER_DETAIL, {
      detail: order,
    });
  };

  return (
    <>
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
                      <Text>
                        {order.customer?.fullName ? order.customer?.fullName : 'Khách lẻ'}
                      </Text>
                      <Text>
                        <FormattedTime
                          value={order.createdAt}
                          day="numeric"
                          month="long"
                          // year="numeric"
                          hour="numeric"
                          minute="numeric"
                          hour12={false}
                        />{' '}
                        - {order.code}
                      </Text>
                    </View>
                  </View>
                  {/* <View>{!!order.status && <OrderCardStatusTag status={order.status} />}</View> */}
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
    </>
  );
};
