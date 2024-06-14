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
    <Pressable onPress={onPress}>
      {({ pressed }) => {
        return (
          <View px={16} py={12} bg={pressed ? '$backgroundLight200' : '$white'}>
            <HStack alignItems="center">
              {!!leftIcon && (
                <View mr={8}>
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
          </View>
        );
      }}
    </Pressable>
  );
};
