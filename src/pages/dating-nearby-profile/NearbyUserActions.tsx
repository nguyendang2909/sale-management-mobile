import { HStack, View } from '@gluestack-ui/themed';
import React from 'react';
import { CloseIconButton } from 'src/components/button';
import { SendMessageButton } from 'src/containers/button/send-message-button';

type FCProps = {
  targetUserId?: string;
  onClose: () => void;
};

export const NearbyUserActions: React.FC<FCProps> = ({ targetUserId, onClose }) => {
  return (
    <>
      <HStack justifyContent="center" columnGap={32}>
        {!!onClose && (
          <View>
            <CloseIconButton onPress={onClose} />
          </View>
        )}
        <View>
          <SendMessageButton targetUserId={targetUserId} onClose={onClose} />
        </View>
        {/* <SendLikeButton targetUserId={targetUserId} /> */}
      </HStack>
    </>
  );
};
