import { View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useUpdateOrderSettingsMutation } from 'src/api/order-setting.api';
import { MenuItemSwitchWithHandler } from 'src/components/menu/menu-item-switch-with-handler';
import { useAppSelector, useMessages } from 'src/hooks';
import { appActions } from 'src/store';
import { OrderSetting } from 'src/types';

export const OrderSettingMenuItem: FC<{
  menuItem: OrderSetting;
}> = ({ menuItem }) => {
  const dispatch = useDispatch();
  const { formatErrorMessage } = useMessages();
  const [updateOrderSettings] = useUpdateOrderSettingsMutation();
  const setting = useAppSelector(s => s.app.orderSettings[menuItem.id]);

  const handleToggle = useRef(_.debounce((e: boolean) => handleSubmit(e), 1000)).current;

  const handleSubmit = async (e: boolean) => {
    try {
      await updateOrderSettings({ [menuItem.id]: e });
      dispatch(appActions.updateOrderSettings({ [menuItem.id]: e }));
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err), type: 'error' });
    }
  };

  return (
    <>
      <View key={menuItem.id}>
        <MenuItemSwitchWithHandler
          title={menuItem.title}
          // subtitle={menuItem.description}
          defaultValue={setting}
          onToggle={handleToggle}
        ></MenuItemSwitchWithHandler>
      </View>
    </>
  );
};
