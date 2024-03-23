import { Icon, Pressable, View } from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { SearchInputProducts } from 'src/containers/Input/SearchInputProducts';
import { useDisclose } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';

export const CreateOrderHeader = () => {
  const { isOpen: isSearching, onOpen: onOpenSearching, onClose: onCloseSearching } = useDisclose();

  const onLeftPress = () => {
    goBack(SCREENS.Home, { screen: HOME_SCREENS.ORDER });
  };

  return (
    <>
      <Header
        title="Tạo đơn"
        leftText="Đơn hàng"
        leftIcon={ChevronLeft}
        onLeftPress={onLeftPress}
        RightActionComponent={
          <>
            {isSearching ? (
              <Pressable onPress={handleCloseSearch}>
                <Icon color="$coolGray500" as={CloseIcon} size="xl" />
              </Pressable>
            ) : (
              <Pressable onPress={handleOpenSearch}>
                <Icon color="$coolGray500" as={SearchIcon} size="xl" />
              </Pressable>
            )}
          </>
        }
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />

      {isSearching && (
        <View px={16} bg="$white">
          <SearchInputProducts />
        </View>
      )}
    </>
  );
};
