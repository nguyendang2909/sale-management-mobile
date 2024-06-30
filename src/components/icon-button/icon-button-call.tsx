import { Icon, View } from '@gluestack-ui/themed';
import { PhoneCall } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { phoneService } from 'src/services';
import { ViewProps } from 'src/types';

export const IconButtonCall: FC<
  ViewProps & {
    phone?: string;
  }
> = ({ phone, ...viewProps }) => {
  const handlePress = async () => {
    if (phone) {
      await phoneService.makeCall(phone!);
    }
  };

  return (
    <View
      p={8}
      {...viewProps}
      as={TouchableOpacity}
      // @ts-ignore
      onPress={handlePress}
    >
      <Icon color="$coolGray500" as={PhoneCall} size="lg" />
    </View>
  );
};
