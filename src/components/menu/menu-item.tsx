import { ChevronRightIcon, HStack, Icon, Pressable, Text, View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import { useMessages } from 'src/hooks';
import { TxKey } from 'src/types';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: FC;
  value?: string;
  valueTx?: TxKey;
  onPress?: () => void;
  isNavigation?: boolean;
};

export const MenuItem: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  value,
  valueTx,
  onPress,
  isNavigation = false,
}) => {
  const { formatMessage } = useMessages();

  return (
    <Pressable
      onPress={onPress}
      height={48}
      justifyContent="center"
      bgColor="$white"
      px={16}
      $active-bg="$backgroundLight200"
    >
      <HStack alignItems="center">
        {!!leftIcon && (
          <View mr={8}>
            <Icon as={leftIcon} />
          </View>
        )}

        {(!!title || !!titleTx) && (
          <View>
            <Text numberOfLines={1}>{title || (!!titleTx && formatMessage(titleTx))}</Text>
          </View>
        )}

        <View flex={1}></View>

        {(!!value || !!valueTx) && (
          <View mr={8}>
            <Text numberOfLines={1} ellipsizeMode="tail" maxWidth={48}>
              {valueTx ? formatMessage(valueTx) : value}
            </Text>
          </View>
        )}

        {isNavigation && (
          <View>
            <ChevronRightIcon />
          </View>
        )}
      </HStack>
    </Pressable>
  );
};
