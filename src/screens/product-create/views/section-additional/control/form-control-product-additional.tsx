import { Button, ButtonText, Icon, ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateProductSettingsMutation } from 'src/api';
import { SCREENS } from 'src/constants';
import { ARR_PRODUCT_SETTINGS } from 'src/constants/constants';
import { useAppDispatch, useMessages, useProductSettings } from 'src/hooks';
import { appActions } from 'src/store';
import { ApiRequest } from 'src/types';

export const FormControlProductAdditional = () => {
  const navigation = useNavigation();
  const { data: settings } = useProductSettings();
  const [updateProductSettings] = useUpdateProductSettingsMutation();
  const dispatch = useAppDispatch();
  const { formatErrorMessage } = useMessages();

  const handlePressSettings = () => {
    navigation.navigate(SCREENS.PRODUCT_SETTING);
  };

  const handleUpdateProductSettings = useCallback(
    async (payload: ApiRequest.UpdateProductSettings) => {
      try {
        await updateProductSettings(payload).unwrap();
        dispatch(appActions.updateProductSettings(payload));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
    [dispatch, formatErrorMessage, updateProductSettings],
  );

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
        <View>
          <TouchableOpacity onPress={handlePressSettings}>
            <Icon as={Settings} size="lg" />
          </TouchableOpacity>
        </View>
        {ARR_PRODUCT_SETTINGS.filter(e => !settings[e.id]).map(e => {
          return (
            <View key={e.id}>
              <Button
                size="sm"
                variant="outline"
                onPress={() => {
                  handleUpdateProductSettings({ [e.id]: true });
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
