import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  View,
} from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';
import { DialogProps } from 'src/types';

export const DialogConfirmExit: FC<DialogProps & { onConfirm: () => void }> = ({
  ...dialogProps
}) => {
  const handleConfirm = useCallback(() => {
    dialogProps.onClose();
    dialogProps.onConfirm();
  }, [dialogProps]);

  return (
    <>
      <Modal {...dialogProps}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Thoát không lưu</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Bạn có chắc chắn muốn thực hiện?</Text>
          </ModalBody>
          <ModalFooter>
            <View flex={1}>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={dialogProps.onClose}
              >
                <ButtonText>Huỷ</ButtonText>
              </Button>
            </View>
            <View flex={1}>
              <Button size="sm" action="positive" borderWidth="$0" onPress={handleConfirm}>
                <ButtonText>Đồng ý</ButtonText>
              </Button>
            </View>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
