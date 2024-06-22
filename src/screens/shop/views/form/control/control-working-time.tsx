import {
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputIcon,
  InputSlot,
  Text,
} from '@gluestack-ui/themed';
import { ChevronDownIcon } from 'lucide-react-native';
import { FC } from 'react';
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { useDisclose, useInit } from 'src/hooks';
import { FormParams } from 'src/types';

import { ActionSheetWorkingTime } from '../../actionsheet/actionsheet-working-time';

export const ControlWorkingTime: FC<{
  control: Control<FormParams.UpdateShop, any>;
  setValue: UseFormSetValue<FormParams.UpdateShop>;
  watch: UseFormWatch<FormParams.UpdateShop>;
}> = ({ control, setValue, watch }) => {
  const {
    isOpen: isOpenActionSheet,
    onClose: onCloseActionsheet,
    onOpen: onOpenActionsheet,
  } = useDisclose();

  const [openTime, closeTime] = watch(['openTime', 'closeTime']);

  const { isInit: isInitActionsheet } = useInit();

  return (
    <>
      <FormControlLabel>
        <FormControlLabelText>Giờ mở cửa</FormControlLabelText>
      </FormControlLabel>
      <TouchableOpacity onPress={onOpenActionsheet}>
        <Input variant="underlined">
          <HStack flex={1} alignItems="center">
            <Controller
              control={control}
              name="openTime"
              rules={{ required: true }}
              render={({ field: { value } }) => <Text>{value}</Text>}
            ></Controller>
            <Text> - </Text>
            <Controller
              control={control}
              name="closeTime"
              rules={{ required: true }}
              render={({ field: { value } }) => <Text>{value}</Text>}
            ></Controller>
          </HStack>
          <InputSlot>
            <InputIcon as={ChevronDownIcon}></InputIcon>
          </InputSlot>
        </Input>
      </TouchableOpacity>

      {isInitActionsheet && (
        <ActionSheetWorkingTime
          isOpen={isOpenActionSheet}
          onClose={onCloseActionsheet}
          setValue={setValue}
          defaultValues={{
            openTime,
            closeTime,
          }}
        />
      )}
    </>
  );
};
