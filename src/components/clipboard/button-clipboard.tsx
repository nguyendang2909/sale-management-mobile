import { Icon } from '@gluestack-ui/themed';
import Clipboard from '@react-native-clipboard/clipboard';
import { Copy } from 'lucide-react-native';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

export const ButtonClipboard: FC<{ value?: string }> = ({ value }) => {
  const handlePress = () => {
    if (value) {
      Clipboard.setString(value);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Icon color="$blue300" as={Copy} />
      </TouchableOpacity>
    </>
  );
};
