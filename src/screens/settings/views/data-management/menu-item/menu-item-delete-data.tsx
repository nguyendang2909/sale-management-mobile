import { Trash } from 'lucide-react-native';
import { FC } from 'react';
import { MenuItem } from 'src/components';
import { useDisclose, useInit } from 'src/hooks';

import { ModalDeleteAccount } from '../modal/modal-delete-account';

export const MenuItemDeleteAccount: FC<{
  onDelete: () => Promise<void>;
}> = ({ onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const { isInit: isInitDialog } = useInit();

  return (
    <>
      <MenuItem leftIcon={Trash} title="Xoá dữ liệu" onPress={onOpen} />
      {isInitDialog && <ModalDeleteAccount isOpen={isOpen} onClose={onClose} onDelete={onDelete} />}
    </>
  );
};
