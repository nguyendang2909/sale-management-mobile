import {
  Actionsheet,
  Button,
  ButtonIcon,
  ButtonText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';
import { FormControl } from 'native-base';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from 'src/components';
import { SelectCategoriesActionsheetContent } from 'src/containers/actionsheet/select-category-item';
import { CreateCategoryModal } from 'src/containers/Modal/create-category-modal';
import { SelectCategoriesCheckbox } from 'src/containers/select/select-categories';
import { useAppSelector, useDisclose } from 'src/hooks';
import { AppStore } from 'src/types';

type FCProps = {
  value: AppStore.Category[];
  setCategory: (category: AppStore.Category) => void;
};

export const CreateProductCategoryFormControl: FC<FCProps> = ({ value, setCategory }) => {
  const categories = useAppSelector(s => s.category.data);

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
                <Button size="sm" variant="outline" onPress={onOpenCreateCategory}>
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

      <CreateCategoryModal onClose={onCloseCreateCategory} isVisible={isOpenCreateCategory} />

      <Actionsheet isOpen={isOpenSelectCategories} onClose={onCloseSelectCategories}>
        <SelectCategoriesActionsheetContent
          categories={categories}
          setCategory={setCategory}
          value={value}
          onOpenCreateCategory={onOpenCreateCategory}
        />
      </Actionsheet>
    </>
  );
};
