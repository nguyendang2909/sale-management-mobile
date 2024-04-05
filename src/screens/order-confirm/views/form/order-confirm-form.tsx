import { Button, ButtonIcon, ButtonText, HStack, View } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const OrderConfirmForm = () => {
  return (
    <>
      <View px={12} bg="$white" py={16}>
        <View>
          <Button variant="outline">
            <ButtonIcon as={Plus}></ButtonIcon>
            <ButtonText>Thêm sản phẩm</ButtonText>
          </Button>
        </View>
      </View>

      <View
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        bgColor="$white"
        as={SafeAreaView}
        // @ts-ignore
        edges={['bottom']}
        py={16}
        borderTopWidth={1}
        borderColor="$coolGray400"
        px={16}
      >
        <HStack columnGap={16} flex={1}>
          <View flex={1}>
            <Button variant="outline">
              <ButtonIcon as={Plus}></ButtonIcon>
              <ButtonText>Lưu đơn</ButtonText>
            </Button>
          </View>

          <View flex={1}>
            <Button variant="solid">
              <ButtonIcon as={Plus}></ButtonIcon>
              <ButtonText>Thanh toán</ButtonText>
            </Button>
          </View>
        </HStack>
      </View>
    </>
  );
};
