import { Button, ButtonText, Pressable, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { AppIcon } from 'src/components';
import { useDisclose, useMessages } from 'src/hooks';

export const SettingsUpgradePlan: React.FC = () => {
  const { formatMessage } = useMessages();
  const {} = useDisclose();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPress = () => {};

  return (
    <>
      <Pressable onPress={onPress}>
        {({ pressed }: { pressed: boolean }) => {
          return (
            <View
              borderWidth={1}
              borderRadius={8}
              borderColor="$amber500"
              bg={pressed ? '$amber600' : '$amber500'}
            >
              <View p={16}>
                <View>
                  <View justifyContent="space-between" flexDirection="row" alignItems="center">
                    <View flexDirection="row" alignItems="center">
                      <AppIcon />
                      <Text color="$white" bold>
                        {formatMessage('Gold member')}
                      </Text>
                    </View>

                    <View>
                      <Button bgColor="$amber700">
                        <ButtonText>{formatMessage('Upgrade')}</ButtonText>
                      </Button>
                    </View>
                  </View>
                  <View>
                    <Text color="$white">{formatMessage('Instant chat with everyone')}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </Pressable>

      {/* <Modal visible={!!profile} animationType="slide">
        <View flex={1}></View>
      </Modal> */}
    </>
  );
};
