import { Center, Icon, Text, View, VStack } from '@gluestack-ui/themed';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useMessages } from 'src/hooks';

export const ProfileVisitorsCard: React.FC = () => {
  const { formatMessage } = useMessages();
  return (
    <>
      <View borderWidth={1} borderRadius={8} borderColor="$backgroundLight200" py={16}>
        <VStack space="sm">
          <Center>
            <View>
              <Icon
                sx={{
                  fontSize: 30,
                  height: 30,
                  width: 30,
                }}
                color="#2e536f"
                as={MaterialIcons}
                // @ts-ignore
                name="remove-red-eye"
              />
            </View>
          </Center>
          <Center>
            <Text>(Coming soon)</Text>
          </Center>
        </VStack>
      </View>
    </>
  );
};
