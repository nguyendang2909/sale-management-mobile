import { Box } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { useSendLikeMutation } from 'src/api';
import { FontAwesome } from 'src/components';
import { LoadingButtonIcon } from 'src/components/button';

type FCProps = {
  targetUserId?: string;
};

export const SendLikeButton: React.FC<FCProps> = ({ targetUserId }) => {
  const [sendLike, { isLoading }] = useSendLikeMutation();
  const [isShowSendLike, setShowSendLike] = useState<boolean>(true);

  const handleSendLike = async () => {
    if (!targetUserId) {
      return;
    }
    try {
      await sendLike({
        targetUserId,
      }).unwrap();
      setShowSendLike(false);
    } catch (err) {}
  };

  if (!isShowSendLike) {
    return null;
  }

  return (
    <Box>
      <LoadingButtonIcon height={48} width={48} onPress={handleSendLike} isLoading={isLoading}>
        <FontAwesome color="white" size={24} name="heart" />
      </LoadingButtonIcon>
    </Box>
  );
};
