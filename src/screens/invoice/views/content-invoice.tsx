import { Divider, Heading, HStack, Text, View } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { FC } from 'react';
import { LoadingOverlay } from 'src/components';
import { TextPrice } from 'src/components/text/text-price';
import { useOrder } from 'src/hooks';
import { AppStore } from 'src/types';
import { orderUtil } from 'src/utils';

import { InvoiceOrderItem } from './orders/invoice-order-item';

export const ContentInvoice: FC<{ detail: AppStore.Order }> = ({ detail }) => {
  const { data: order, isLoading: isLoadingOrder } = useOrder(detail);
  return (
    <>
      <LoadingOverlay isLoading={isLoadingOrder} />
      <View mt={16} bgColor="$white" p={16} flex={1}>
        <View flex={1}>
          <FlashList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={order.items}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({ item, index }) => {
              return <InvoiceOrderItem item={item} index={index} />;
            }}
            ListHeaderComponent={
              <>
                <View>
                  <Heading
                    textAlign="center"
                    fontSize="$lg"
                    fontWeight="$semibold"
                    textTransform="uppercase"
                    // eslint-disable-next-line react-native/no-raw-text
                  >
                    Hoá đơn tạm tính
                  </Heading>
                </View>

                <View>
                  <Text textAlign="center">
                    {order.code} - {orderUtil.getTime(order)}
                  </Text>
                </View>
                <View>
                  <Text>Khách: Khách lẻ</Text>
                </View>

                <Divider mt={16} />
                <HStack mt={16}>
                  <View flex={1}>
                    <Text fontWeight="$semibold">Đơn giá</Text>
                  </View>
                  <View minWidth={30}>
                    <Text>SL</Text>
                  </View>
                  <View minWidth={70}>
                    <Text textAlign="right">T.Tiền</Text>
                  </View>
                </HStack>
              </>
            }
            ListFooterComponent={
              <View mt={16}>
                <Divider />
                <View flexDirection="row" mt={16} justifyContent="space-between">
                  <Text fontWeight="$semibold">Tổng cộng</Text>
                  <TextPrice variant="primary" value={order.amount}></TextPrice>
                </View>
                {/* <View flexDirection="row" mt={16} justifyContent="space-between">
                  <Text>Chưa thanh toán</Text>
                  <TextPrice variant="primary" value={order.amount}></TextPrice>
                </View> */}
              </View>
            }
          ></FlashList>
        </View>
      </View>
    </>
  );
};
