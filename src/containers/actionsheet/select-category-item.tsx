import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ButtonIcon,
  Heading,
  RefreshControl,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useFetchAllCategoriesQuery } from 'src/api';
import { FontAwesome } from 'src/components';
import { SearchInput } from 'src/components/input/search-input';
import { AppStore } from 'src/types';

import { SelectCategoriesCheckbox } from '../select/select-categories';

type FCProps = {
  categories: AppStore.Category[];
  setCategory: (e: AppStore.Category) => void;
  value: AppStore.Category[];
  onOpenCreateCategory: () => void;
};

export const SelectCategoriesActionsheetContent: FC<FCProps> = ({
  categories,
  value,
  setCategory,
  onOpenCreateCategory,
}) => {
  const { isFetching, refetch } = useFetchAllCategoriesQuery({});

  const [searchText, setSearchText] = useState<string>('');
  const [currentCategories, setCurrentCategories] = useState(categories);

  useEffect(() => {
    setCurrentCategories(
      searchText
        ? categories.filter(category => category.title?.includes(searchText.toLowerCase()))
        : categories,
    );
  }, [categories, searchText]);

  const handleSetText = useRef(
    _.debounce((e: string) => {
      setSearchText(e);
    }, 500),
  ).current;

  return (
    <>
      <ActionsheetBackdrop />
      <ActionsheetContent height={400} px={16}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <View alignItems="center">
          <Heading>Danh mục</Heading>
        </View>
        <View
          mt={16}
          w="$full"
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          columnGap={16}
        >
          <View flex={1}>
            <SearchInput placeholder="Tìm kiếm danh mục" onChangeText={handleSetText} />
          </View>
          <View>
            <TouchableOpacity onPress={onOpenCreateCategory}>
              <ButtonIcon
                as={FontAwesome}
                // @ts-ignore
                name="plus"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          mt={16}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch}></RefreshControl>
          }
          flex={1}
          width="$full"
        >
          <View flex={1} alignItems="baseline">
            <View>
              <SelectCategoriesCheckbox
                categories={currentCategories}
                setCategory={setCategory}
                value={value}
              />
            </View>
          </View>
        </ScrollView>
      </ActionsheetContent>
    </>
  );
};
