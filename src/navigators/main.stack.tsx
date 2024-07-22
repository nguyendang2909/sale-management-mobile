import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from 'src/constants';
import { CashItemAddScreen } from 'src/screens/cash-item-add/cash-item-add.screen';
import { CashItemSubtractScreen } from 'src/screens/cash-item-subtract/cash-item-subtract.screen';
import { CategoryScreen } from 'src/screens/category/category.screen';
import { CategoryAddProductsScreen } from 'src/screens/category-add-products/category-add-products';
import { CategoryDeleteProductsScreen } from 'src/screens/category-delete-products/category-delete-products';
import { CategoryPickProductsScreen } from 'src/screens/category-pick-product/category-pick-products.screen';
import { CashItemChild } from 'src/screens/child/cash-items.child.screen';
import { OrdersChildScreen } from 'src/screens/child/orders.child.screen';
import { ProductsChildScreen } from 'src/screens/child/products.child.screen';
import { ReportsChildScreen } from 'src/screens/child/reports.child.screen';
import { CustomerScreen } from 'src/screens/customer/customer.screen';
import { InvoiceScreen } from 'src/screens/invoice/invoice.screen';
import { NotificationsScreen } from 'src/screens/notifications/notifications.screen';
import { OrderScreen } from 'src/screens/order/order.screen';
import { OrderConfirmScreen } from 'src/screens/order-confirm/order-confirm.screen';
import { OrderCreateScreen } from 'src/screens/order-create/order-create.screen';
import { OrderSettingScreen } from 'src/screens/order-setting/order-setting.screen';
import { OrderPaymentScreen } from 'src/screens/order-update-payment/order-payment.screen';
import { ProductCreateScreen } from 'src/screens/product-create/product-create.screen';
import { ProductScreen } from 'src/screens/product-detail/product.screen';
import { ProductSettingScreen } from 'src/screens/product-setting/product-setting.screen';
import { ProfileCreateScreen } from 'src/screens/profile-create/profile-create.screen';
import { SaleReportsScreen } from 'src/screens/sale-reports/sale-reports.screen';
import { SettingsScreen } from 'src/screens/settings/settings.screen';
import { ShopScreen } from 'src/screens/shop/shop.screen';
import { ShopsScreen } from 'src/screens/shops/shops.screen';
import { SkuEditScreen } from 'src/screens/sku-edit/sku-edit.screen';
import { colors } from 'src/theme';
import { AppStore, Entity, FormParams } from 'src/types';

import { HomeNavigator, HomeTabParamList } from './home-navigator';
import { Stack } from './Stack';

export type AppStackParamList = {
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  HOME: NavigatorScreenParams<HomeTabParamList>;
  SETTINGS: undefined;
  // Messages: {
  //   matchId: string;
  //   match: Entity.Match;
  // };
  SIGN_IN: undefined;
  SIGN_IN_WITH_OTP_PHONE_NUMBER: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SIGN_IN_WITH_PHONE_NUMBER: undefined;
  Welcome: undefined;
  // Product
  PRODUCT_CREATE: undefined;
  SKU_EDIT: {
    sku: FormParams.CreateProductSku;
    product: {
      title: string;
    };
  };
  PRODUCT: {
    detail: AppStore.Product;
  };
  PRODUCT_SETTING: undefined;
  // Category
  CATEGORY: {
    detail: AppStore.Category;
  };
  CATEGORY_PICK_PRODUCTS: {
    detail: AppStore.Category;
  };
  CATEGORY_DELETE_PRODUCTS: {
    detail: AppStore.Category;
  };
  CATEGORY_ADD_PRODUCTS: {
    detail: AppStore.Category;
  };
  // Order
  ORDERS_CHILD: undefined;
  ORDER_CREATE: {
    values: FormParams.CreateOrder;
  };
  ORDER_CONFIRM: {
    values: FormParams.CreateOrder;
  };
  ORDER_SETTING: undefined;
  ORDER: {
    detail: Entity.Order;
  };
  ORDER_PAYMENT: {
    order: Entity.Order;
    updateStatusDelivered?: boolean;
  };
  AUTH_PROFILE: undefined;
  SHOPS: undefined;
  CUSTOMER: {
    detail: AppStore.Customer;
  };
  // Reports
  REPORTS_CHILD: undefined;
  SALE_REPORTS: undefined;
  PRODUCTS_CHILD: undefined;
  TABLES_CHILD: undefined;
  CASH_ITEMS_CHILD: undefined;

  CASH_ITEM_ADD: undefined;
  CASH_ITEM_SUBTRACT: undefined;

  NOTIFICATIONS: undefined;
  INVOICE: {
    order: AppStore.Order;
  };
  SHOP: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export const MainStack: React.FC = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
          orientation: 'portrait',
        }}
        // initialRouteName={SCREENS.PRODUCT_CREATE}
        initialRouteName={SCREENS.SHOPS}
      >
        <Stack.Group>
          <Stack.Screen name={SCREENS.SHOPS} component={ShopsScreen} />
          <Stack.Screen name={SCREENS.SHOP} component={ShopScreen} />
          <Stack.Screen name={SCREENS.HOME} component={HomeNavigator} />
          {/* <Stack.Screen name={SCREENS.LikedMe} component={LikedMeScreen} /> */}
          <Stack.Screen name={SCREENS.CREATE_BASIC_PROFILE} component={ProfileCreateScreen} />
          {/* <Stack.Screen name={SCREENS.CREATE_BASIC_PHOTOS} component={CreateBasicPhotosScreen} /> */}
          {/* <Stack.Screen name={SCREENS.ProfileEdit} component={ProfileEditScreen} /> */}
          <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
          {/* <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} /> */}
          {/* <Stack.Screen
            name={SCREENS.DATING_NEARBY_FILTER}
            component={DatingNearbyFilterScreen}
          ></Stack.Screen> */}
          {/* <Stack.Screen name={SCREENS.ChatProfile} component={ChatProfileScreen}></Stack.Screen> */}
          {/* <Stack.Screen
            name={SCREENS.LikedMeProfile}
            component={LikedMeProfileScreen}
          ></Stack.Screen> */}
          {/* <Stack.Screen name={SCREENS.EDIT_INFO_LOCATION} component={EditInfoLocationScreen} /> */}
          {/* <Stack.Screen name={SCREENS.SUBJECT} component={SubjectScreen} /> */}
          {/* Product */}
          <Stack.Screen name={SCREENS.PRODUCT_CREATE} component={ProductCreateScreen} />
          <Stack.Screen name={SCREENS.SKU_EDIT} component={SkuEditScreen} />

          <Stack.Screen name={SCREENS.PRODUCT} component={ProductScreen} />
          <Stack.Screen name={SCREENS.PRODUCT_SETTING} component={ProductSettingScreen} />

          {/* Category */}
          <Stack.Screen name={SCREENS.CATEGORY} component={CategoryScreen} />
          <Stack.Screen
            name={SCREENS.CATEGORY_PICK_PRODUCTS}
            component={CategoryPickProductsScreen}
          />
          <Stack.Screen
            name={SCREENS.CATEGORY_ADD_PRODUCTS}
            component={CategoryAddProductsScreen}
          />
          <Stack.Screen
            name={SCREENS.CATEGORY_DELETE_PRODUCTS}
            component={CategoryDeleteProductsScreen}
          />

          {/* Order */}
          <Stack.Screen name={SCREENS.ORDER_CREATE} component={OrderCreateScreen} />
          <Stack.Screen name={SCREENS.ORDER_CONFIRM} component={OrderConfirmScreen} />
          <Stack.Screen name={SCREENS.ORDER_SETTING} component={OrderSettingScreen} />
          <Stack.Screen name={SCREENS.ORDER} component={OrderScreen} />
          <Stack.Screen name={SCREENS.ORDER_PAYMENT} component={OrderPaymentScreen} />
          <Stack.Screen name={SCREENS.ORDERS_CHILD} component={OrdersChildScreen} />
          <Stack.Screen name={SCREENS.INVOICE} component={InvoiceScreen} />

          {/* Report */}
          <Stack.Screen name={SCREENS.SALE_REPORTS} component={SaleReportsScreen} />
          <Stack.Screen name={SCREENS.REPORTS_CHILD} component={ReportsChildScreen} />
          <Stack.Screen name={SCREENS.NOTIFICATIONS} component={NotificationsScreen} />
          <Stack.Screen name={SCREENS.CUSTOMER} component={CustomerScreen} />
          <Stack.Screen name={SCREENS.PRODUCTS_CHILD} component={ProductsChildScreen} />

          {/* Cash items */}
          <Stack.Screen name={SCREENS.CASH_ITEMS_CHILD} component={CashItemChild} />
          <Stack.Screen name={SCREENS.CASH_ITEM_ADD} component={CashItemAddScreen} />
          <Stack.Screen name={SCREENS.CASH_ITEM_SUBTRACT} component={CashItemSubtractScreen} />
        </Stack.Group>

        {/* <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name={SCREENS.EditInfoHeight} component={EditInfoHeightScreen} />
          <Stack.Screen name={SCREENS.EditInfoNickname} component={EditInfoNicknameScreen} />
          <Stack.Screen name={SCREENS.EditInfoWeight} component={EditInfoWeightScreen} />
        </Stack.Group> */}
      </Stack.Navigator>
    </>
  );
};
