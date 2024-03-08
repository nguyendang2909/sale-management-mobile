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
  value?: boolean;
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

  const handleValueChange = (e: boolean) => {
    setValue(e);
  };

  return (
    <FormControl flexDirection="row" justifyContent="space-between">
      <FormControlLabel>
        <FormControlLabelText>{titleTx ? formatMessage(titleTx) : title}</FormControlLabelText>
      </FormControlLabel>
      <View>
        <Switch
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
        ></Switch>
      </View>
    </FormControl>
  );
};
