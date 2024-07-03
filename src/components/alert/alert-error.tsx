import { Alert, AlertIcon, AlertText } from '@gluestack-ui/themed';
import { CircleAlert } from 'lucide-react-native';
import { FC } from 'react';
import { AlertProps } from 'src/types';

export const AlertError: FC<AlertProps & { description: string }> = ({
  description,
  ...alertProps
}) => {
  if (!description) {
    return null;
  }
  return (
    <Alert {...alertProps} action="error">
      <AlertIcon as={CircleAlert} mr={12} />
      <AlertText color="$error600">{description}</AlertText>
    </Alert>
  );
};
