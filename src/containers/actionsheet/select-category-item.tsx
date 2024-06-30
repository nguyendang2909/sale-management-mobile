import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import _ from 'lodash';
import { Plus } from 'lucide-react-native';
import { FC, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewFooter } from 'src/components';
import { SearchInput } from 'src/components/input/search-input';
import { ActionsheetProps, AppStore } from 'src/types';

import { SelectCategoriesCheckbox } from '../select/select-categories';

export const ActionSheetSelectCategories: FC<
  ActionsheetProps & {
    categories: AppStore.Category[];
    setCategory: (e: AppStore.Category) => void;
    value: AppStore.Category[];
    onOpenCreateCategory: () => void;
    isRefreshingCategories: boolean;
    refreshCategories: () => void;
  }
> = ({
  categories,
  isRefreshingCategories,
  refreshCategories,
  value,
  setCategory,
  onOpenCreateCategory,
  ...restProps
}) => {
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
    <Actionsheet {...restProps}>
      <ActionsheetBackdrop />

      <ActionsheetContent px={0} pb={0}>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100} w="$full">
          <View w="$full" h="$full" height={400} px={16}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <View alignItems="center">
              <Heading>Danh mục</Heading>
            </View>
            <View w="$full" flexDirection="row" justifyContent="center" alignItems="center">
              <View flexGrow={1}>
                <SearchInput placeholder="Tìm kiếm danh mục" onChangeText={handleSetText} />
              </View>
              <View>
                <View
                  as={TouchableOpacity}
                  p={8}
                  // @ts-ignore
                  onPress={onOpenCreateCategory}
                >
                  <ButtonIcon as={Plus} />
                </View>
              </View>
            </View>
            <ScrollView
              flexGrow={1}
              mt={16}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshingCategories}
                  onRefresh={refreshCategories}
                ></RefreshControl>
              }
              width="$full"
            >
              <View flex={1} alignItems="baseline">
                <Text>asdasd</Text>
                <View>
                  <SelectCategoriesCheckbox
                    categories={categories}
                    setCategory={setCategory}
                    value={value}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        <ViewFooter py={16} w="$full" px={16}>
          <Button>
            <ButtonText>Cập nhật</ButtonText>
          </Button>
        </ViewFooter>
        {/* <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View alignItems="center">
            <Heading>Danh mục</Heading>
          </View>
          <View
            px={16}
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
        </KeyboardAvoidingView>

        <ViewFooter py={16} w="$full" px={16}>
          <Button>
            <ButtonText>Cập nhật</ButtonText>
          </Button>
        </ViewFooter> */}
      </ActionsheetContent>
    </Actionsheet>
  );
};
