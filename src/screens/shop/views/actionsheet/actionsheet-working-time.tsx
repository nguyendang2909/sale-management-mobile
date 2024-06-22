import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
  Button,
  ButtonText,
  CircleIcon,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { FC, useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ViewFooter } from 'src/components';
import { FormParams } from 'src/types';

import { InputPickTime } from '../form/control/input/input-hour';

export const ActionSheetWorkingTime: FC<{
  isOpen: boolean;
  onClose: () => void;
  setValue: UseFormSetValue<FormParams.UpdateShop>;
  defaultValues: {
    openTime: string;
    closeTime: string;
  };
}> = ({ isOpen, onClose, setValue, defaultValues }) => {
  const isAlways = defaultValues.openTime === '00:00' && defaultValues.closeTime === '23:59';

  const [openTime, setOpenTime] = useState<string>(defaultValues.openTime);
  const [closeTime, setCloseTime] = useState<string>(defaultValues.closeTime);
  const [type, setType] = useState<'always' | 'custom'>(isAlways ? 'always' : 'custom');

  const handlePressApply = () => {
    if (type === 'always') {
      setValue('openTime', '00:00');
      setValue('closeTime', '23:59');
    } else {
      setValue('openTime', openTime);
      setValue('closeTime', closeTime);
    }
    onClose();
  };

  useEffect(() => {
    setOpenTime(defaultValues.openTime);
    setCloseTime(defaultValues.closeTime);
    setType(
      defaultValues.openTime === '00:00' && defaultValues.closeTime === '23:59'
        ? 'always'
        : 'custom',
    );
  }, [defaultValues.closeTime, defaultValues.openTime]);

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          h="$72"
          zIndex={999}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
            <View mt={8}>
              <Heading>Cập nhật giờ làm việc</Heading>
            </View>
          </ActionsheetDragIndicatorWrapper>
          <View px={16}>
            <RadioGroup pt={24} value={type} onChange={setType}>
              <VStack gap={8}>
                <Box>
                  <Radio value="always" size="md">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Luôn mở cửa</RadioLabel>
                  </Radio>
                  <Text size="sm" ml="$7" color="$textLight500">
                    Hoạt động 24/7
                  </Text>
                </Box>
                <Box>
                  <Radio value="custom" size="md">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Giờ làm việc</RadioLabel>
                  </Radio>
                  <Text size="sm" ml="$7" color="$textLight500">
                    Thời gian làm việc trong ngày
                  </Text>
                </Box>
              </VStack>
            </RadioGroup>
            {type === 'custom' && (
              <View mt={16} px={8} flexDirection="row" width="100%" gap={16}>
                <InputPickTime
                  flex={1}
                  label="Từ"
                  value={openTime}
                  onChange={(e: string) => {
                    setOpenTime(e);
                  }}
                />
                <InputPickTime
                  flex={1}
                  label="Đến"
                  value={closeTime}
                  onChange={(e: string) => {
                    setCloseTime(e);
                  }}
                />
              </View>
            )}
          </View>
          <ViewFooter mt={16} py={16} isShadow={false}>
            <HStack w="$full" gap={16}>
              <View flex={1}>
                <Button onPress={handlePressApply}>
                  <ButtonText>Áp dụng</ButtonText>
                </Button>
              </View>
            </HStack>
          </ViewFooter>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
