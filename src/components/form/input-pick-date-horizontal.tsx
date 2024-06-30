import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  View,
} from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react-native';
import moment from 'moment';
import { FC } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TIME_FORMATS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { ViewProps } from 'src/types';

export const InputPickDateHorizontal: FC<
  ViewProps & {
    label: string;
    value: string;
    onChange: (e: string) => void;
  }
> = ({ value, onChange, label, ...viewProps }) => {
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

        <Button variant="outline" onPress={onOpen} action="picker" size="xs">
          <ButtonText>{value}</ButtonText>
          <ButtonIcon ml={8} as={ChevronDown}></ButtonIcon>
        </Button>
      </FormControl>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="date"
        onConfirm={handlePickDate}
        onCancel={onClose}
        date={new Date()}
      />
    </View>
  );
};
