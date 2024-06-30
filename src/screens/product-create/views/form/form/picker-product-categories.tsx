import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from 'src/components';
import { ActionSheetSelectCategories } from 'src/containers/actionsheet/select-category-item';
import { ModalCreateCategory } from 'src/containers/modal/modal-create-category';
import { SelectCategoriesCheckbox } from 'src/containers/select/select-categories';
import { useDisclose, useInit } from 'src/hooks';
import { useCategories } from 'src/hooks/useCategories';

type FCProps = {
  value: string[];
  onChange: (categoryIds: string[]) => void;
};

export const PickerProductCategories: FC<FCProps> = ({ value, onChange }) => {
  const {
    data: categories,
    isRefreshing: isRefreshingCategories,
    refresh: refreshCategories,
  } = useCategories();
  const { isInit: isInitActionsheet } = useInit();
  const { isInit: isInitModal } = useInit();

  const handlePressCategory = useCallback(
    (id: string) => {
      if (value.find(e => e === id)) {
        onChange(value.filter(e => e !== id));
      } else {
        onChange([...value, id]);
      }
    },
    [onChange, value],
  );

  const {
    isOpen: isOpenCreateCategory,
    onClose: onCloseCreateCategory,
    onOpen: onOpenCreateCategory,
  } = useDisclose();

  const {
    isOpen: isOpenSelectCategories,
    onClose: onCloseSelectCategories,
    onOpen: onOpenSelectCategories,
  } = useDisclose();

  const handlePressCategoryNavMenu = () => {
    onOpenSelectCategories();
  };

  const handleOpenCreateCategory = () => {
    onOpenCreateCategory();
  };

  return (
    <>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Danh mục</FormControlLabelText>
        </FormControlLabel>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View flexDirection="row" alignItems="center" columnGap={8} rowGap={8} py={16}>
              <View>
                <TouchableOpacity onPress={handlePressCategoryNavMenu}>
                  <Icon as={Menu} size="xl" />
                </TouchableOpacity>
              </View>
              <View>
                <SelectCategoriesCheckbox
                  categories={categories}
                  onPress={handlePressCategory}
                  value={value}
                />
              </View>
              <View>
                <Button size="sm" variant="outline" onPress={handleOpenCreateCategory}>
                  {/* 
                        //@ts-ignore */}
                  <ButtonIcon as={FontAwesome} name="plus"></ButtonIcon>
                  <ButtonText>Tạo danh mục</ButtonText>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </FormControl>
      {isInitModal && (
        <ModalCreateCategory
          onClose={onCloseCreateCategory}
          isVisible={isOpenCreateCategory}
          onChange={handlePressCategory}
        />
      )}
      {isInitActionsheet && (
        <ActionSheetSelectCategories
          isOpen={isOpenSelectCategories}
          onClose={onCloseSelectCategories}
          categories={categories}
          isRefreshingCategories={isRefreshingCategories}
          refreshCategories={refreshCategories}
          onPressCategory={handlePressCategory}
          value={value}
          onOpenCreateCategory={onOpenCreateCategory}
        />
      )}
    </>
  );
};
