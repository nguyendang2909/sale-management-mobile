import { Trash } from 'lucide-react-native';
import { MenuItem } from 'src/components';

export const MenuItemDeleteShop = () => {
  return (
    <>
      <MenuItem
        leftIcon={Trash}
        title="Xoá cửa hàng"
        // leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        onPress={() => {
          console.log(111);
        }}
      />
    </>
  );
};
