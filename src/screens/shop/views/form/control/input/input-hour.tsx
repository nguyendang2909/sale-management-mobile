import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputIcon,
  InputSlot,
  Text,
  View,
} from '@gluestack-ui/themed';
import { Clock } from 'lucide-react-native';
import moment from 'moment';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TIME_FORMATS } from 'src/constants';
import { useDisclose } from 'src/hooks';
import { ViewProps } from 'src/types';

export const InputPickTime: FC<
  ViewProps & {
    label: string;
    value: string;
    onChange: (e: string) => void;
  }
> = ({ value, onChange, label, ...viewProps }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePick = (e: Date) => {
    const date = moment(e).format(TIME_FORMATS.HOUR);
    onChange(date);
    onClose();
  };

  return (
    <View {...viewProps}>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <TouchableOpacity onPress={onOpen}>
          <Input variant="underlined">
            {/* <ButtonIcon as={Calendar} mr={8}></ButtonIcon> */}
            <HStack flex={1} alignItems="center">
              <Text>{value}</Text>
            </HStack>
            <InputSlot>
              <InputIcon as={Clock}></InputIcon>
            </InputSlot>
          </Input>
        </TouchableOpacity>
      </FormControl>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="time"
        onConfirm={handlePick}
        onCancel={onClose}
        date={moment(value, 'hh:mm').toDate()}
      />
    </View>
  );
};
