import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCreateProductMutation } from 'src/api';
import {
  FontAwesome,
  FormControlInput,
  FormControlSwitch,
  LoadingLayout,
  MaterialIcons,
} from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';
import { flexGrow } from 'src/styles';
import { ApiRequest, FormParams } from 'src/types';
import * as Yup from 'yup';

export const CreateProductForm: FC = () => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [createProduct] = useCreateProductMutation();
  const navigation = useNavigation();

  const formik = useFormik<FormParams.CreateProduct>({
    initialValues: {
      title: '',
      price: undefined,
      capitalPrice: undefined,
      promotionalPrice: undefined,
      wholesalePrice: undefined,
      isInStock: true,
      isTrackingStock: false,
      sku: '',
      unit: '',
      createMore: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(1).required('Thông tin bắt buộc'),
      price: Yup.number().positive().notOneOf([0]).required('Thông tin bắt buộc'),
      capitalPrice: Yup.number().positive().optional(),
      promotionPrice: Yup.number().positive().optional(),
      wholesalePrice: Yup.number().positive().optional(),
      isInStock: Yup.boolean().optional(),
      isTrackingStock: Yup.boolean().optional(),
      sku: Yup.string().max(200).optional(),
      unit: Yup.string().max(50).optional(),
    }),
    onSubmit: async values => {
      try {
        const { createMore, ...restValues } = values;
        const payload = _.pickBy<ApiRequest.CreateProduct>(restValues, _.identity);
        // @ts-ignore
        await createProduct(payload).unwrap();
        if (createMore) {
          formik.resetForm();
          return;
        }
        navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: HOME_SCREENS.PRODUCT }));
      } catch (error) {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    },
  });

  const handleCreateProduct = async () => {
    formik.setFieldValue('createMore', false);
    formik.handleSubmit();
  };

  const handleCreateMoreProduct = () => {
    formik.setFieldValue('createMore', true);
    formik.handleSubmit();
  };

  const handleChangeTrackingStock = (e: boolean) => {
    formik.setFieldValue('isTrackingStock', e);
  };

  return (
    <View flex={1}>
      <LoadingLayout isLoading={formik.isSubmitting} />
      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <ScrollView style={flexGrow}>
              <View px={16} py={8} bgColor="$white" mb={16}>
                <View mb={16}>
                  <FormControlInput
                    isRequired
                    label="Tên sản phẩm"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    placeholder="Ví dụ: Tương ớt Chinsu"
                    error={formik.touched.title ? formik.errors.title : undefined}
                  />
                </View>

                <View mb={16}>
                  <View flexDirection="row" columnGap={16}>
                    <View flex={1}>
                      <FormControlInput
                        isRequired={true}
                        label="Giá bán"
                        inputMode="numeric"
                        value={formik.values.price?.toString()}
                        onChange={e => {
                          formik.setFieldValue('price', e ? +e : undefined);
                        }}
                        placeholder="0.0"
                        error={formik.touched.price ? formik.errors.price : undefined}
                      />
                    </View>
                    <View flex={1}>
                      <FormControlInput
                        label="Giá vốn"
                        inputMode="numeric"
                        value={formik.values.capitalPrice?.toString()}
                        onChange={e => {
                          formik.setFieldValue('capitalPrice', e ? +e : undefined);
                        }}
                        placeholder="0.0"
                        error={formik.touched.capitalPrice ? formik.errors.capitalPrice : undefined}
                      />
                    </View>
                  </View>
                </View>

                <View mb={16}>
                  <FormControlInput
                    label="Giá khuyến mãi"
                    inputMode="numeric"
                    value={formik.values.promotionalPrice?.toString()}
                    onChange={e => {
                      formik.setFieldValue('promotionalPrice', e ? +e : undefined);
                    }}
                    placeholder="0.0"
                    error={
                      formik.touched.promotionalPrice ? formik.errors.promotionalPrice : undefined
                    }
                  />
                </View>

                <View mb={16}>
                  <FormControlInput
                    label="Đơn vị"
                    value={formik.values.unit}
                    onChange={formik.handleChange('unit')}
                    placeholder="Ví dụ: vỉ"
                    error={formik.touched.unit ? formik.errors.unit : undefined}
                  />
                </View>

                <View mb={16}>
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText>Danh mục</FormControlLabelText>
                    </FormControlLabel>
                    <View flexDirection="row" alignItems="center" columnGap={8}>
                      <View>
                        {/* 
                      //@ts-ignore */}
                        <Icon as={MaterialIcons} name="menu" size="xl" />
                      </View>
                      <View>
                        <Button variant="outline">
                          {/* 
                        //@ts-ignore */}
                          <ButtonIcon as={FontAwesome} name="plus"></ButtonIcon>
                          <ButtonText>Tạo danh mục</ButtonText>
                        </Button>
                      </View>
                    </View>
                  </FormControl>
                </View>
              </View>
              <View px={16} py={16} bgColor="$white">
                <View>
                  <Heading>Quản lý tồn kho</Heading>
                </View>
                <View mt={16}>
                  <FormControl flexDirection="row" justifyContent="space-between">
                    <FormControlLabel>
                      <FormControlLabelText>Còn hàng</FormControlLabelText>
                    </FormControlLabel>
                    <View>
                      <Switch></Switch>
                    </View>
                  </FormControl>
                </View>
                <View mt={16}>
                  <FormControlSwitch
                    title="Theo dõi tồn kho"
                    value={formik.values.isTrackingStock}
                    setValue={handleChangeTrackingStock}
                  />
                </View>
              </View>
            </ScrollView>

            <View px={16} py={16}>
              <View flexDirection="row" columnGap={16}>
                <View flex={1}>
                  <Button variant="outline" onPress={handleCreateMoreProduct}>
                    <ButtonText>Tạo thêm</ButtonText>
                  </Button>
                </View>
                <View flex={1}>
                  <Button onPress={handleCreateProduct}>
                    <ButtonText>Hoàn tất</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
    </View>
  );
};
