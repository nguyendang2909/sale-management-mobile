import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  CloseIcon,
  Heading,
  Icon,
  InfoIcon,
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
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUnmatchMutation } from 'src/api';
import { BoxSafeView, MaterialIcons } from 'src/components';
import { LoadingButton } from 'src/components/button';
import { useMessages } from 'src/hooks';
import { useDisclose } from 'src/hooks/useDisclose';

export const MessagesSetting: React.FC<{ matchId: string }> = ({ matchId }) => {
  const navigation = useNavigation();
  const [unmatch, { isLoading: isLoadingUnMatch }] = useUnmatchMutation();
  const { isOpen: isOpenSheet, onOpen: onOpenSheet, onClose: onCloseSheet } = useDisclose();
  const {
    isOpen: isOpenUnmatchModal,
    onOpen: onOpenUnmatchModal,
    onClose: onCloseUnmatchModal,
  } = useDisclose();
  const [isInitSheet, setInitSheet] = useState<boolean>(false);
  const [isInitUnmatchModal, setInitUnmatchModal] = useState<boolean>(false);
  const refUnmatchModal = React.useRef(null);

  const handlePressUnmatch = () => {
    onCloseSheet();
    setInitUnmatchModal(true);
    onOpenUnmatchModal();
  };

  const { formatMessage } = useMessages();

  const handleUnmatch = async () => {
    try {
      await unmatch({ id: matchId }).unwrap();
      onCloseUnmatchModal();
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: formatMessage('Unmatch'),
      });
    } catch (err) {
      onCloseUnmatchModal();
      Toast.show({
        type: 'error',
        text1: formatMessage('Update failed, please try again.'),
      });
    }
  };

  const handleOpenSheet = () => {
    setInitSheet(true);
    onOpenSheet();
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenSheet}>
        <Icon height={28} width={28} as={InfoIcon} />
      </TouchableOpacity>

      {isInitSheet && (
        <Actionsheet isOpen={isOpenSheet} onClose={onCloseSheet} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent zIndex={999}>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Gender')}
              </Heading>
            </Box>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem flexDirection="row" onPress={handlePressUnmatch}>
              {/* 
              @ts-ignore */}
              <Icon as={MaterialCommunityIcons} name="close-circle" size="xl" color="$amber600" />
              <View pl={16}>
                <ActionsheetItemText bold>Remove conversation</ActionsheetItemText>
                <ActionsheetItemText>
                  No longer interested? Remove them from your chats.
                </ActionsheetItemText>
              </View>
            </ActionsheetItem>
            <ActionsheetItem flexDirection="row" onPress={() => {}}>
              {/* 
              @ts-ignore */}
              <Icon as={MaterialIcons} name="block" size="xl" />
              <View pl={16}>
                <ActionsheetItemText bold>{formatMessage('Block')}</ActionsheetItemText>
                <ActionsheetItemText>
                  {formatMessage("You won't see them, and they won't see you")}
                </ActionsheetItemText>
              </View>
            </ActionsheetItem>
            <ActionsheetItem flexDirection="row" onPress={() => {}}>
              {/* 
              @ts-ignore */}
              <Icon as={MaterialIcons} name="report" size="xl" />
              <View pl={16}>
                <ActionsheetItemText bold>{formatMessage('Report')}</ActionsheetItemText>
                <ActionsheetItemText>
                  {formatMessage("Don't worry - we won't tell them")}
                </ActionsheetItemText>
              </View>
            </ActionsheetItem>
            <BoxSafeView bottom />
          </ActionsheetContent>
        </Actionsheet>
      )}

      {isInitUnmatchModal && (
        <Modal
          isOpen={isOpenUnmatchModal}
          onClose={onCloseUnmatchModal}
          finalFocusRef={refUnmatchModal}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg"></Heading>

              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text textAlign="center">
                Would you like to remove this conversation? This cannot be undone.
              </Text>
            </ModalBody>
            <ModalFooter>
              <LoadingButton
                width="$full"
                action="positive"
                borderWidth="$0"
                onPress={handleUnmatch}
                isLoading={isLoadingUnMatch}
              >
                {formatMessage('Yes')}
              </LoadingButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
