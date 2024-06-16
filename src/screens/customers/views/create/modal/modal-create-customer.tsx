import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Modal } from 'react-native';
import { CreateCustomerModal } from 'src/containers/modal/create-customer.modal';
import { useInit } from 'src/hooks';

export const ModalCreateCustomer: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isInit } = useInit();

  if (!isInit) {
    return null;
  }

  return (
    <Modal animationType="slide" visible={isOpen}>
      <View flex={1}>
        <CreateCustomerModal onClose={onClose} />
      </View>
    </Modal>
  );
};
