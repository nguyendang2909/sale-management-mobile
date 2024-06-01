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
import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteCategoryMutation } from 'src/api';
import { LoadingButton } from 'src/components';
import { AlertError } from 'src/components/alert/alert-error';
import { IconButtonDelete } from 'src/components/icon-button/icon-button-delete';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useDisclose, useInit } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { categoryActions } from 'src/store';
import { AppStore } from 'src/types';

type FCProps = {
  category: AppStore.Category;
};

export const IconButtonDeleteCategory: FC<FCProps> = ({ category }) => {
  const dispatch = useDispatch();
  const [deleteCategoryMutation, { isLoading: isLoadingDelete }] = useDeleteCategoryMutation();
  const [errorResponse, setErrorResponse] = useState<any | null>(null);

  const { isInit } = useInit();

  const deleteModalRef = useRef(null);

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclose();

  const handleDelete = async () => {
    try {
      setErrorResponse(null);
      await deleteCategoryMutation(category.id).unwrap();
      dispatch(categoryActions.deleteById(category.id));
      goBack(SCREENS.HOME, { screen: HOME_SCREENS.PRODUCTS });
    } catch (err) {
      setErrorResponse(err);
    }
  };

  const handleOpenDelete = () => {
    onOpenDeleteModal();
  };

  return (
    <>
      <IconButtonDelete onPress={handleOpenDelete} />
      {isInit && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={onCloseDeleteModal}
          finalFocusRef={deleteModalRef}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Xoá danh mục</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text>Bạn có chắc chắn rằng muốn xoá danh mục?</Text>
              {!errorResponse && <AlertError description="asdasd" />}
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
              <LoadingButton
                isLoading={isLoadingDelete}
                size="sm"
                borderWidth="$0"
                onPress={handleDelete}
              >
                <ButtonText>Xoá</ButtonText>
              </LoadingButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
