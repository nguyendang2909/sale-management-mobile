import { Box, HStack, IconButton, Text, View } from 'native-base';
import React, { FC } from 'react';
import { useMessages } from 'src/hooks';
import { alignItemsCenter } from 'src/styles';
import { colors, spacing } from 'src/theme';
import { TxKey } from 'src/types';

type FCProps = {
  bg?: string;
  textTx?: TxKey;
  leftIcon?: FC<{ color: string }>;
  onPressLeftIcon?: () => void;
};

export const Header: FC<FCProps> = ({ bg, textTx, leftIcon: LeftIcon, onPressLeftIcon }) => {
  const { formatMessage } = useMessages();

  return (
    <View>
      <Box safeAreaTop backgroundColor={colors.primary} />
      <Box bg={bg || colors.primary} style={{ minHeight: spacing.xxl }}>
        <HStack>
          <HStack style={alignItemsCenter}>
            {!!LeftIcon && (
              <IconButton
                color="white"
                icon={<LeftIcon color="light" />}
                onPress={onPressLeftIcon}
              />
            )}
            {!!textTx && <Text color="light">{formatMessage(textTx)}</Text>}
          </HStack>
        </HStack>
      </Box>
    </View>
  );
};
