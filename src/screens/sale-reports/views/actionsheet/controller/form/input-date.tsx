import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  View,
} from '@gluestack-ui/themed';
import moment from 'moment';
import { FC } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TIME_FORMATS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { ViewProps } from 'src/types';

export const InputPickDate: FC<
  ViewProps & {
    label: string;
    value: string;
    onChange: (e: string) => void;
    maxTime?: Date;
    minTime?: Date;
  }
> = ({ value, onChange, label, minTime, maxTime, ...viewProps }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePickDate = (e: Date) => {
    const date = moment(e).format(TIME_FORMATS.DATE);
    onChange(date);
    onClose();
  };

  return (
    <View {...viewProps}>
      <FormControl flexDirection="row" gap={24} alignItems="center">
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>

        <Button onPress={onOpen} action="picker" size="xs">
          <ButtonText>{value}</ButtonText>
        </Button>
      </FormControl>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="date"
        onConfirm={handlePickDate}
        onCancel={onClose}
        date={new Date()}
        maximumDate={maxTime}
        minimumDate={minTime}
      />
    </View>
  );
};
