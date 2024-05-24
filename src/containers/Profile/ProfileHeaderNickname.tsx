import { Text } from '@gluestack-ui/themed';
import React from 'react';
import { useAppSelector } from 'src/hooks';

export const ProfileHeaderNickname: React.FC = () => {
  const nickname = useAppSelector(state => state.app.profile?.nickname);

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" isTruncated>
        {nickname}
      </Text>
    </>
  );
};
