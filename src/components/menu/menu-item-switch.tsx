import { FormControlLabelText, HStack, Icon, Switch, View } from '@gluestack-ui/themed';
import React from 'react';
import { useMessages } from 'src/hooks';
import { TxKey } from 'src/types';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  value?: boolean;
  onToggle?: (value: boolean) => void;
};

export const MenuItemSwitch: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  value,
  onToggle,
}) => {
  const { formatMessage } = useMessages();

  return (
    <View py={8}>
      <HStack alignItems="center">
        {!!leftIcon && (
          <View mr={2}>
            <Icon as={leftIcon} />
          </View>
        )}

        {(!!title || !!titleTx) && (
          <View>
            <FormControlLabelText>
              {title || (!!titleTx && formatMessage(titleTx))}
            </FormControlLabelText>
          </View>
        )}

        <View flex={1}></View>

        <View>
          <Switch size="sm" value={value} onToggle={onToggle} />
        </View>
      </HStack>
    </View>
  );
};
