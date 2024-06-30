import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft } from 'lucide-react-native';
import { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useUpdateCategoryMutation } from 'src/api';
import { Header, LoadingOverlay, ViewFooter } from 'src/components';
import { InputSearch } from 'src/components/input/input-search';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useCategory, useMessages, useSearchProductsByCategoryId } from 'src/hooks';
import { goBack } from 'src/navigations/navigation-ref';
import { AppStackScreenProps } from 'src/navigators/main.stack';
import * as Yup from 'yup';

import { PickProductListItem } from '../category-pick-product/views/product-list/pick-product-list-item';

export const CategoryDeleteProductsScreen: FC<AppStackScreenProps<'CATEGORY_DELETE_PRODUCTS'>> = ({
  route: {
    params: { detail },
  },
}) => {
  const { data: category } = useCategory({ detail });
  const [updateCategoryMutation] = useUpdateCategoryMutation();

  const [searchText, setSearchText] = useState<string>('');
  const { formatErrorMessage } = useMessages();

  const {
    data: products,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
    isRefreshing: isRefreshingProducts,
    refresh: refreshProducts,
  } = useSearchProductsByCategoryId({ categoryId: detail.id }, { refetchOnMountOrArgChange: true });

  const onLeftPress = () => {
    goBack(SCREENS.HOME, {
      screen: HOME_SCREENS.PRODUCTS,
    });
  };

  const { setValue, getValues, handleSubmit } = useForm<{ productIds: string[] }>({
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

  const onSubmit: SubmitHandler<{ productIds: string[] }> = async values => {
    try {
      if (values.productIds.length) {
        await updateCategoryMutation({
          id: detail.id,
          body: {
            deleteProductIds: values.productIds,
          },
        }).unwrap();
        refetchProducts();
      }
      goBack(SCREENS.CATEGORY, {
        detail: category,
      });
    } catch (error) {
      Toast.show({
        text1: formatErrorMessage(error),
        type: 'error',
      });
    }
  };

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
          renderItem={({ item }) => {
            return <PickProductListItem product={item} onPress={handlePressProduct} />;
          }}
          estimatedItemSize={100}
          ListFooterComponent={<View height={100}></View>}
        ></FlashList>
        <ViewFooter px={16} py={16} bgColor="#fff" isShadow={true}>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Xoá sản phẩm</ButtonText>
          </Button>
        </ViewFooter>
      </View>
    </>
  );
};
