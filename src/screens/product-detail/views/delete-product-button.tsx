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
import { useNavigation } from '@react-navigation/native';
import { FC, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useDeleteProductMutation } from 'src/api';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { productActions } from 'src/store';
import { AppStore } from 'src/types';

type FCProps = {
  product: AppStore.Product;
  setLoading: (e: boolean) => void;
  isLoading: boolean;
};

export const DeleteProductButton: FC<FCProps> = ({ product, setLoading, isLoading }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [isInit, setInit] = useState<boolean>(false);

  const deleteModalRef = useRef(null);

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclose();

  const handleDelete = async () => {
    try {
      setLoading(true);
      onCloseDeleteModal();
      await deleteProductMutation(product.id).unwrap();
      dispatch(productActions.deleteProductById(product.id));
      navigation.navigate(SCREENS.HOME, { screen: HOME_SCREENS.PRODUCTS });
    } catch (err) {
      Toast.show({
        text1: 'Xoá sản phẩm thất bại. Xin vui lòng thử lại.',
        type: 'error',
      });
    } finally {
      setLoading(true);
    }
  };

  const handleOpenDelete = () => {
    setInit(true);
    onOpenDeleteModal();
  };

  return (
    <>
      <Button variant="outline" onPress={handleOpenDelete} disabled={isLoading}>
        <ButtonText>Xoá</ButtonText>
      </Button>
      {isInit && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={onCloseDeleteModal}
          finalFocusRef={deleteModalRef}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Xoá sản phẩm</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text>Bạn có chắc chắn rằng muốn xoá sản phẩm này?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                // action="secondary"
                mr="$3"
                onPress={onCloseDeleteModal}
              >
                <ButtonText>Huỷ</ButtonText>
              </Button>
              <Button size="sm" borderWidth="$0" onPress={handleDelete}>
                <ButtonText>Xoá</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
