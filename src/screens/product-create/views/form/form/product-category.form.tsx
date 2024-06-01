import {
  Actionsheet,
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
import { FC, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from 'src/components';
import { SelectCategoriesActionsheetContent } from 'src/containers/actionsheet/select-category-item';
import { ModalCreateCategory } from 'src/containers/modal/modal-create-category';
import { SelectCategoriesCheckbox } from 'src/containers/select/select-categories';
import { useAppSelector, useDisclose } from 'src/hooks';
import { AppStore } from 'src/types';

type FCProps = {
  value: AppStore.Category[];
  onChange: (category: AppStore.Category[]) => void;
};

export const ProductCategoryForm: FC<FCProps> = ({ value, onChange }) => {
  const categories = useAppSelector(s => s.category.data);
  const [isInitActionsheet, setInitActionsheet] = useState<boolean>(false);
  const [isInitModal, setInitModal] = useState<boolean>(false);

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

  useEffect(() => {
    if (!isInitActionsheet) {
      setInitActionsheet(true);
    }
  }, [isInitActionsheet]);

  const handlePressCategoryNavMenu = () => {
    // setInitActionsheet(true);
    onOpenSelectCategories();
  };

  const handleOpenCreateCategory = () => {
    setInitModal(true);
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
        <Actionsheet isOpen={isOpenSelectCategories} onClose={onCloseSelectCategories}>
          <SelectCategoriesActionsheetContent
            categories={categories}
            setCategory={setCategory}
            value={value}
            onOpenCreateCategory={onOpenCreateCategory}
          />
        </Actionsheet>
      )}
    </>
  );
};
