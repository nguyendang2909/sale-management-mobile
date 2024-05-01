import { Button, ButtonText, Icon, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateOrderSettingsMutation } from 'src/api';
import { ARR_ORDER_SETTINGS, SCREENS } from 'src/constants';
import { useAppDispatch, useMessages, useOrderSettings } from 'src/hooks';
import { appActions } from 'src/store';
import { ApiRequest } from 'src/types';

export const FormControlOrderAdditional = () => {
  const navigation = useNavigation();
  const { data: settings } = useOrderSettings();
  const [updateOrderSettings] = useUpdateOrderSettingsMutation();
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const handlePressSettings = () => {
    navigation.navigate(SCREENS.ORDER_SETTING);
  };

  const handleUpdateOrderSettings = useCallback(
    async (payload: ApiRequest.UpdateOrderSettings) => {
      try {
        await updateOrderSettings(payload).unwrap();
        dispatch(appActions.updateOrderSettings(payload));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
    [dispatch, formatErrorMessage, updateOrderSettings],
  );

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
        <View>
          <TouchableOpacity onPress={handlePressSettings}>
            <Icon as={Settings} size="lg" />
          </TouchableOpacity>
        </View>
        {ARR_ORDER_SETTINGS.filter(e => !settings[e.id]).map(e => {
          return (
            <View key={e.id}>
              <Button
                size="sm"
                variant="outline"
                onPress={() => {
                  handleUpdateOrderSettings({ [e.id]: true });
                }}
              >
                <ButtonText>{e.title}</ButtonText>
              </Button>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
