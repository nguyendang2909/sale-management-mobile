import { HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { CloseIconButton, LikeIconButton } from 'src/components/button';

import { SendMessageButton } from '../button/send-message-button';

type FCProps = {
  targetUserId: string;
  onDislike: () => void;
  onSendLike: () => void;
};

export const ProfileMenuActions: FC<FCProps> = ({ onDislike, onSendLike, targetUserId }) => {
  return (
    <HStack justifyContent="center" columnGap={32}>
      <View>
        <CloseIconButton onPress={onDislike} />
      </View>
      <View>
        <SendMessageButton targetUserId={targetUserId} onClose={onDislike} />
      </View>
      <LikeIconButton onPress={onSendLike} />
    </HStack>
  );
};
