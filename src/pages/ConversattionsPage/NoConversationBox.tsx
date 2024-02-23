import { Box, Text } from '@gluestack-ui/themed';
import React from 'react';
import { LinearGradient } from 'src/components';
import { useMessages } from 'src/hooks';

export const NoConversationBox: React.FC = () => {
  const { formatMessage } = useMessages();
  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box px={16}>
          <Box alignItems="center">
            <LinearGradient
              colors={['#fd267a', '#ff6036']}
              height={129}
              width={96}
              borderRadius={16}
            />
          </Box>
          <Box mt={16}>
            <Text textAlign="center" bold={true} size="2xl">
              {formatMessage('Start chatting')}
            </Text>
          </Box>
          <Box mt={8}>
            <Text textAlign="center">
              {formatMessage(
                'Chats will appear here once you start to find conversation. You can message them directly from here when you’re ready to spark up the conversation.',
              )}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
