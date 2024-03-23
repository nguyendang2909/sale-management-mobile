import { View } from '@gluestack-ui/themed';
import { Header } from 'src/components';
import { IconButtonSearchCategories } from 'src/containers/icon-button/icon-button-search-categories';
import { SearchInputCategories } from 'src/containers/Input/SearchInputCategories';

export const CategoryTabHeader = () => {
  return (
    <>
      <Header
        title="Danh mục"
        RightActionComponent={
          <>
            <View pr={8}>
              <View
                justifyContent="flex-end"
                alignItems="center"
                flexDirection="row"
                columnGap={8}
                rowGap={8}
              >
                <IconButtonSearchCategories />
              </View>
            </View>
          </>
        }
      />
      <SearchInputCategories
        viewProps={{
          px: 16,
          bg: '$white',
        }}
      />
    </>
  );
};
