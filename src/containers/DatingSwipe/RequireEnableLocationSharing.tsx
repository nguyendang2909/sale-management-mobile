import { Button, Heading, Text, View } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { PermissionStatus } from 'react-native-permissions';
import { useMessages } from 'src/hooks';
import { locationPermissionsService } from 'src/services/location-permissions.service';

type FCProps = {
  onChange: (value: PermissionStatus | null) => void;
};

export const RequireEnalbeLocationSharing: React.FC<FCProps> = ({ onChange }) => {
  const { formatMessage } = useMessages();

  const handlePress = async () => {
    const permission = await locationPermissionsService.request();
    if (permission !== 'granted') {
      Linking.openSettings();
    }
    if (permission === 'granted') {
      onChange(permission);
    }
  };

  return (
    <View flex={1} justifyContent="center">
      <View alignItems="center" px={4}>
        <Heading size="sm">{formatMessage('Unable to connect')}</Heading>
      </View>

      <View mt={5} alignItems="center" px={4}>
        <Text textAlign="center">
          To use Chatka, you need to enable your location sharing so we can show you teacher&apos;s
          around.
        </Text>
      </View>

      <View mt={5} alignItems="center" px={4}>
        <Text textAlign="center">
          Go to Settings {'>'} Chatka {'>'} Location {'>'} Enable Location While Using the App
        </Text>
      </View>

      <View mt={7} alignItems="center" px={4}>
        <Button w="full" onPress={handlePress}>
          {formatMessage('Open settings')}
        </Button>
      </View>
    </View>
  );
};
