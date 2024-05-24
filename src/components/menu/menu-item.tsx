import { ChevronRightIcon, HStack, Icon, Pressable, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { useMessages } from 'src/hooks';
import { TxKey } from 'src/types';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  value?: string;
  valueTx?: TxKey;
  onPress?: () => void;
};

export const MenuItem: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  value,
  valueTx,
  onPress,
}) => {
  const { formatMessage } = useMessages();

  return (
    <Pressable
      {...(onPress
        ? {
            onPress: () => {
              onPress();
            },
          }
        : {})}
    >
      {({ isPressed }) => {
        return (
          <View px={16} py={16} bg={isPressed ? 'coolGray.200' : undefined}>
            <HStack alignItems="center">
              {!!leftIcon && (
                <View mr={2}>
                  <Icon as={leftIcon} />
                </View>
              )}

              {(!!title || !!titleTx) && (
                <View>
                  <Text>{title || (!!titleTx && formatMessage(titleTx))}</Text>
                </View>
              )}

              <View flex={1}></View>

              {(!!value || !!valueTx) && (
                <View mr={2}>
                  <Text numberOfLines={1} ellipsizeMode="tail" maxWidth={48}>
                    {valueTx ? formatMessage(valueTx) : value}
                  </Text>
                </View>
              )}

              <View>
                <ChevronRightIcon />
              </View>
            </HStack>
          </View>
        );
      }}
    </Pressable>
  );
};
