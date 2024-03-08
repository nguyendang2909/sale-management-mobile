import { KeyboardAvoidingView, Spinner } from '@gluestack-ui/themed';
import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
import { AvatarProps, GiftedChat, IChatMessage, IMessage } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { ChatSpinner } from 'src/containers/Messages/ChatSpinner';
import { RenderAvatar } from 'src/containers/Messages/RenderAvatar';
import { RenderMessage } from 'src/containers/Messages/RenderMessage';
import { useChatMessages } from 'src/hooks/temp/useChatMessages';
import { socketStoreActions } from 'src/store/socket.store';
import { ChatUser } from 'src/types';
import { scrollUtil } from 'src/utils/scroll.util';
import { v4 as uuidV4 } from 'uuid';

type FCProps = {
  matchId: string;
  currentUser: ChatUser;
  targetUser: ChatUser;
};
export const MessagesChat: React.FC<FCProps> = ({ matchId, currentUser, targetUser }) => {
  const dispatch = useDispatch();

  const { data: messages = [], fetchNext, isLoadingNext } = useChatMessages({ matchId });

  const handleSend = useCallback(
    (messages: IChatMessage[] = []) => {
      for (const message of messages) {
        dispatch(
          socketStoreActions.sendMessage({
            text: message.text,
            uuid: uuidV4(),
            matchId,
          }),
        );
      }
    },
    [dispatch, matchId],
  );

  const renderAvatar = useCallback(
    (props: AvatarProps<IMessage>) => {
      return <RenderAvatar avatarProps={props} currentUser={currentUser} targetUser={targetUser} />;
    },
    [currentUser, targetUser],
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollUtil.isCloseToTop(e)) {
        fetchNext();
      }
    },
    [fetchNext],
  );

  return (
    <>
      <GiftedChat
        isLoadingEarlier={true}
        loadEarlier={isLoadingNext}
        renderLoadEarlier={ChatSpinner}
        messages={messages}
        onSend={handleSend}
        user={{
          _id: currentUser._id,
        }}
        showUserAvatar={true}
        alwaysShowSend={true}
        renderAvatarOnTop
        listViewProps={{
          initialNumToRender: 25,
          scrollEventThrottle: 400,
          onScroll: handleScroll,
        }}
        renderAvatar={renderAvatar}
        maxInputLength={5000}
        renderBubble={RenderMessage}
        scrollToBottom={true}
        scrollToBottomComponent={() => {
          return <Spinner />;
        }}
      />
      {Platform.OS === 'android' && (
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
      )}
    </>
  );
};
