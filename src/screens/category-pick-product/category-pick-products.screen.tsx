import { View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Header, LoadingOverlay } from 'src/components';
import { InputSearch } from 'src/components/input/input-search';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useCategory, useSearchProducts } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';
import * as Yup from 'yup';

import { PickProductListItem } from './views/product-list/pick-product-list-item';

export const CategoryPickProductsScreen: FC<AppStackScreenProps<'CATEGORY_PICK_PRODUCTS'>> = ({
  route: {
    params: { detail },
  },
}) => {
  const { data: category } = useCategory({ detail });

  const {
    data: products,
    isRefreshing: isRefreshingProducts,
    isLoading: isLoadingProducts,
    refresh: refreshProducts,
    searchText,
    setSearchText,
  } = useSearchProducts();

  const onLeftPress = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };

  const { setValue, getValues } = useForm<{ productIds: string[] }>({
    defaultValues: {
      productIds: [],
    },
    resolver: yupResolver(
      Yup.object({
        productIds: Yup.array().of(Yup.string().required()).required(),
      }),
    ),
  });

  const handlePressProduct = useCallback(
    (id: string) => {
      const values = getValues('productIds');
      if (values.includes(id)) {
        setValue(
          'productIds',
          values.filter(productId => productId !== id),
        );
        return;
      }
      setValue('productIds', values.concat(id));
    },
    [getValues, setValue],
  );

  return (
    <>
      <Header
        leftText={category.title || 'Danh mục'}
        onLeftPress={onLeftPress}
        leftIcon={ChevronLeft}
      >
        <InputSearch
          px={16}
          pb={16}
          placeholder={'Tìm kiếm sản phẩm'}
          defaultValue={searchText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </Header>
      <View flex={1} mt={16}>
        <LoadingOverlay isLoading={isLoadingProducts} />
        <FlashList
          refreshing={isRefreshingProducts}
          onRefresh={refreshProducts}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={products}
          keyExtractor={(item, index) => item.id || index.toString()}
          // extraData={{
          //   cartItems,
          // }}
          renderItem={({ item }) => {
            return <PickProductListItem product={item} onPress={handlePressProduct} />;
          }}
          estimatedItemSize={100}
          ListFooterComponent={<View height={100}></View>}
        ></FlashList>
      </View>
    </>
  );
};
