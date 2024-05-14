import { Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useDisclose } from 'src/hooks';

import { DialogDeleteOrder } from './delete-order-dialog';

export const ButtonDeleteOrder: FC<{ isDeleting: boolean }> = ({ isDeleting }) => {
  const { isOpen, onClose, onOpen } = useDisclose();

  return (
    <>
      <Button variant="outline" disabled={isDeleting} onPress={onOpen}>
        <ButtonText>Huỷ</ButtonText>
      </Button>
      <DialogDeleteOrder orderId="a" isOpen={isOpen} onClose={onClose} />
    </>
  );
};
