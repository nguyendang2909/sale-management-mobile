import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

export const TextLinkNext: FC<{ onPress?: () => void; text: string }> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack alignItems="center">
        <View>
          <Text color="$success400">{text}</Text>
        </View>
        <View>
          <Icon color="$success400" as={ChevronRight} />
        </View>
      </HStack>
    </TouchableOpacity>
  );
};
