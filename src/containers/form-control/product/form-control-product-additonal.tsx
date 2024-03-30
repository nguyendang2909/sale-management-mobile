import { Button, ButtonText, Icon, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import { useCallback } from 'react';
import { TouchableHighlight } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateSettingsMutation } from 'src/api';
import { SCREENS } from 'src/constants';
import { ARR_PRODUCT_SETTINGS } from 'src/constants/constants';
import { useAppDispatch, useMessages, useSettings } from 'src/hooks';
import { appActions } from 'src/store';
import { ApiRequest } from 'src/types';

export const FormControlProductAdditional = () => {
  const navigation = useNavigation();
  const { data: settings } = useSettings();
  const [updateSettings] = useUpdateSettingsMutation();
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const handlePressSettings = () => {
    navigation.navigate(SCREENS.PRODUCT_SETTING);
  };

  const handleUpdateSettings = useCallback(
    async (payload: ApiRequest.UpdateSettings) => {
      try {
        await updateSettings(payload).unwrap();
        dispatch(appActions.updateSettings(payload));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
    [dispatch, formatErrorMessage, updateSettings],
  );

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
        <View>
          <TouchableHighlight onPress={handlePressSettings}>
            <Icon as={Settings} size="lg" />
          </TouchableHighlight>
        </View>
        {ARR_PRODUCT_SETTINGS.filter(e => !settings[e.id]).map(e => {
          return (
            <View key={e.id}>
              <Button
                size="sm"
                variant="outline"
                onPress={() => {
                  handleUpdateSettings({ [e.id]: true });
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
