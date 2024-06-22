import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Switch,
  View,
} from '@gluestack-ui/themed';
import { FC } from 'react';
import { useMessages } from 'src/hooks';
import { TxKey } from 'src/types';

type FCProps = {
  title?: string;
  titleTx?: TxKey;
  value?: boolean | null;
  defaultValue?: boolean;
  setValue: (e: boolean) => void;
};

export const FormControlSwitch: FC<FCProps> = ({
  title,
  titleTx,
  value,
  defaultValue,
  setValue,
}) => {
  const { formatMessage } = useMessages();

  return (
    <FormControl flexDirection="row" justifyContent="space-between">
      <FormControlLabel>
        <FormControlLabelText>{titleTx ? formatMessage(titleTx) : title}</FormControlLabelText>
      </FormControlLabel>
      <View>
        <Switch
          size="sm"
          value={value}
          defaultValue={defaultValue}
          onValueChange={setValue}
        ></Switch>
      </View>
    </FormControl>
  );
};
