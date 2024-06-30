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
import { AppStore } from 'src/types';

type FCProps = {
  value: AppStore.Category[];
  onChange: (category: AppStore.Category[]) => void;
};

export const ProductCategoryForm: FC<FCProps> = ({ value, onChange }) => {
  const {
    data: categories,
    isRefreshing: isRefreshingCategories,
    refresh: refreshCategories,
  } = useCategories();
  const { isInit: isInitActionsheet } = useInit();
  const { isInit: isInitModal } = useInit();

  const setCategory = useCallback(
    (category: AppStore.Category) => {
      if (value.find(e => e.id === category.id)) {
        onChange(value.filter(e => e.id !== category.id));
      } else {
        onChange([...value, category]);
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
                  setCategory={setCategory}
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
        <ModalCreateCategory onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />
      )}
      {isInitActionsheet && (
        <ActionSheetSelectCategories
          isOpen={isOpenSelectCategories}
          onClose={onCloseSelectCategories}
          categories={categories}
          isRefreshingCategories={isRefreshingCategories}
          refreshCategories={refreshCategories}
          setCategory={setCategory}
          value={value}
          onOpenCreateCategory={onOpenCreateCategory}
        />
      )}
    </>
  );
};
