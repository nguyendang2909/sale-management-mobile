import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { IconButtonSearchCategories } from 'src/containers/icon-button/icon-button-search-categories';
import { SearchInputCategories } from 'src/containers/Input/search-input-categories';
import { goBack } from 'src/navigations';

export const CategoryTabHeader: FC<{ allowBack?: boolean }> = ({ allowBack }) => {
  const handleBack = () => {
    goBack(SCREENS.HOME, { screen: HOME_SCREENS.MANAGEMENT });
  };

  return (
    <>
      <Header
        title="Danh mục"
        {...(allowBack ? { onLeftPress: handleBack } : undefined)}
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
      >
        <SearchInputCategories
          viewProps={{
            px: 16,
            bg: '$white',
            mb: 16,
          }}
        />
      </Header>
    </>
  );
};
