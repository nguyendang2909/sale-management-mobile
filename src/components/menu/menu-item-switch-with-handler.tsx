import { FormControlLabelText, HStack, Icon, Switch, View } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { useMessages } from 'src/hooks';
import { TxKey } from 'src/types';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  leftIcon?: React.ReactElement;
  defaultValue?: boolean;
  onToggle?: (value: boolean) => void;
  subtitle?: string;
};

export const MenuItemSwitchWithHandler: React.FC<FCProps> = ({
  leftIcon,
  title,
  titleTx,
  defaultValue,
  onToggle,
}) => {
  const { formatMessage } = useMessages();

  const [value, setValue] = useState(!!defaultValue);

  useEffect(() => {
    setValue(!!defaultValue);
  }, [defaultValue]);

  const handleToggle = (e: boolean) => {
    setValue(e);
    if (onToggle) {
      onToggle(e);
    }
  };

  return (
    <View height={48} justifyContent="center">
      <HStack alignItems="center">
        {!!leftIcon && (
          <View mr={2}>
            <Icon as={leftIcon} />
          </View>
        )}

        <View>
          {(!!title || !!titleTx) && (
            <View>
              <FormControlLabelText numberOfLines={1}>
                {title || (!!titleTx && formatMessage(titleTx))}
              </FormControlLabelText>
            </View>
          )}
        </View>

        <View flex={1}></View>

        <View>
          <Switch value={value} onToggle={handleToggle} />
        </View>
      </HStack>
    </View>
  );
};
