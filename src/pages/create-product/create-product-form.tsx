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
import { SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';
import { flexGrow } from 'src/styles';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

export const CreateProductForm: FC = () => {
  const { formatMessage } = useMessages();
  const [createProduct] = useCreateProductMutation();
  const navigation = useNavigation();

  const formik = useFormik<FormParams.CreateProduct>({
    initialValues: {
      title: '',
      price: undefined,
      capitalPrice: '',
      promotionalPrice: '',
      wholesalePrice: '',
      isInStock: true,
      isTrackingStock: false,
      sku: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(10).required('Thông tin bắt buộc'),
      price: Yup.number().notOneOf([0]).required('Thông tin bắt buộc'),
    }),
    onSubmit: async values => {
      try {
        await createProduct(_.pickBy(values, _.identity)).unwrap();
        navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: 'DatingSwipe' }));
      } catch (error) {
        Toast.show({
          text1: formatMessage('Oops, something went wrong. Please try again.'),
        });
      }
    },
  });

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
                        label="Giá bán"
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        placeholder="0.0"
                        error={formik.touched.title ? formik.errors.title : undefined}
                      />
                    </View>
                    <View flex={1}>
                      <FormControlInput
                        label="Giá vốn"
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        placeholder="0.0"
                        error={formik.touched.title ? formik.errors.title : undefined}
                      />
                    </View>
                  </View>
                </View>

                <View mb={16}>
                  <FormControlInput
                    isRequired
                    label="Giá khuyến mãi"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    placeholder="Ví dụ: Tương ớt Chinsu"
                    error={formik.touched.title ? formik.errors.title : undefined}
                  />
                </View>

                <View mb={16}>
                  <FormControlInput
                    label="Đơn vị"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    placeholder="Ví dụ: 1 vỉ"
                    error={formik.touched.title ? formik.errors.title : undefined}
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

            <View px={16}>
              <View flexDirection="row" columnGap={16}>
                <View flex={1}>
                  <Button
                    variant="outline"
                    onPress={() => {
                      formik.handleSubmit();
                    }}
                  >
                    <ButtonText>Tạo thêm</ButtonText>
                  </Button>
                </View>
                <View flex={1}>
                  <Button
                    onPress={() => {
                      formik.handleSubmit();
                    }}
                  >
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
