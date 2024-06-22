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
} from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { LoadingButton } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { useMessages } from 'src/hooks';
import { appActions, dispatch } from 'src/store';

export const ModalDeleteAccount: FC<{
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}> = ({ isOpen, onClose, onDelete }) => {
  const { formatErrorMessage } = useMessages();
  const [errorResponse, setErrorResponse] = useState<any | null>(null);

  const handleDelete = async () => {
    try {
      setErrorResponse(null);
      await onDelete();
      dispatch(appActions.logout());
    } catch (err) {
      setErrorResponse(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Xoá tài khoản</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Bạn có chắc chắn rằng muốn xoá tài khoản?</Text>
            {errorResponse && (
              <AlertError mt={16} description={formatErrorMessage(errorResponse)} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              // action="secondary"
              mr="$3"
              onPress={onClose}
            >
              <ButtonText>Huỷ</ButtonText>
            </Button>
            <LoadingButton size="sm" borderWidth="$0" onPress={handleDelete}>
              <ButtonText>Xoá</ButtonText>
            </LoadingButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
