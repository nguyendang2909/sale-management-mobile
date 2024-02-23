import { ScrollView, View } from '@gluestack-ui/themed';
import { LogoutButton } from 'src/containers/button/logout-button';
import { useMessages } from 'src/hooks';

export const ProfileSettingScrollView = () => {
  const { formatMessage } = useMessages();

  return (
    <>
      <ScrollView>
        {/* <View mt={16} mb={16}>
          <View mb={8}>
            <View px={16}>
              <Text bold={true} textTransform="uppercase" numberOfLines={1}>
                {formatMessage('Discovery settings')}
              </Text>
            </View>

            <View mt={16}>
              <View py={16} backgroundColor="$backgroundLight0">
                <EditMaxDistanceAuto />
              </View>
              <Divider />
              <View backgroundColor="$backgroundLight0">
                <EditFilterGenderAuto />
              </View>
              <Divider />
              <View py={16} backgroundColor="$backgroundLight0">
                <EditFilterAgeAuto />
              </View>
            </View>
          </View>
        </View> */}

        <View mt={16}>
          <View px={12}>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
