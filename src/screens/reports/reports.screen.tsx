import { Button, ButtonText, View, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { navigate } from 'src/navigations';

export const ReportsScreen = () => {
  return (
    <>
      <Header title="Báo cáo" />
      <View flex={1} mt={16}>
        <View px={16}>
          <VStack gap={16}>
            <View>
              <Button
                size="xl"
                variant="outline"
                onPress={() => {
                  navigate(SCREENS.SALE_REPORTS);
                }}
              >
                <ButtonText>Bán hàng</ButtonText>
              </Button>
            </View>
            <View>
              <Button size="xl" variant="outline">
                <ButtonText>Lãi lỗ</ButtonText>
              </Button>
            </View>
            <View>
              <Button size="xl" variant="outline">
                <ButtonText>Cửa hàng</ButtonText>
              </Button>
            </View>
            <View>
              <Button size="xl" variant="outline">
                <ButtonText>Kho hàng</ButtonText>
              </Button>
            </View>
            <View>
              <Button size="xl" variant="outline">
                <ButtonText>Thu chi</ButtonText>
              </Button>
            </View>
            <View>
              <Button size="xl" variant="outline">
                <ButtonText>Công nợ</ButtonText>
              </Button>
            </View>
          </VStack>
        </View>
      </View>
    </>
  );
};
