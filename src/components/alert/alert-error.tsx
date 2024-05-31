import { Alert, AlertIcon, Text } from '@gluestack-ui/themed';
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
    <Alert variant="outline" {...alertProps} action="error">
      <AlertIcon as={CircleAlert} mr={12} />
      <Text>{description}</Text>
    </Alert>
  );
};
