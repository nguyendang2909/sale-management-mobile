import { ImageBackground } from '@gluestack-ui/themed';
import * as React from 'react';
import { ImageStyle, StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export const iconRegistry = {
  back: require('../../../assets/icons/back.png'),
  bell: require('../../../assets/icons/bell.png'),
  caretLeft: require('../../../assets/icons/caretLeft.png'),
  caretRight: require('../../../assets/icons/caretRight.png'),
  check: require('../../../assets/icons/check.png'),
  clap: require('../../../assets/icons/clap.png'),
  community: require('../../../assets/icons/community.png'),
  components: require('../../../assets/icons/components.png'),
  debug: require('../../../assets/icons/debug.png'),
  github: require('../../../assets/icons/github.png'),
  heart: require('../../../assets/icons/heart.png'),
  hidden: require('../../../assets/icons/hidden.png'),
  ladybug: require('../../../assets/icons/ladybug.png'),
  lock: require('../../../assets/icons/lock.png'),
  menu: require('../../../assets/icons/menu.png'),
  more: require('../../../assets/icons/more.png'),
  pin: require('../../../assets/icons/pin.png'),
  podcast: require('../../../assets/icons/podcast.png'),
  settings: require('../../../assets/icons/settings.png'),
  slack: require('../../../assets/icons/slack.png'),
  view: require('../../../assets/icons/view.png'),
  x: require('../../../assets/icons/x.png'),
  shop: require('../../../assets/icons/shop.png'),
  shop2: require('../../../assets/icons/shop2.png'),
  gift: require('../../../assets/icons/ecommerce/gift.png'),
  calculator: require('../../../assets/icons/ecommerce/calculator.png'),
  cashBack: require('../../../assets/icons/ecommerce/cash-back.png'),
  money: require('../../../assets/icons/ecommerce/money.png'),
  onlineShop: require('../../../assets/icons/ecommerce/online-shop.png'),
  priority: require('../../../assets/icons/ecommerce/priority.png'),
  protection: require('../../../assets/icons/ecommerce/protection.png'),
  purse: require('../../../assets/icons/ecommerce/purse.png'),
  quality: require('../../../assets/icons/ecommerce/quality.png'),
  return: require('../../../assets/icons/ecommerce/return.png'),
  review: require('../../../assets/icons/ecommerce/review.png'),
  sale: require('../../../assets/icons/ecommerce/sale.png'),
  savings: require('../../../assets/icons/ecommerce/savings.png'),
  shipping: require('../../../assets/icons/ecommerce/shipping.png'),
  store: require('../../../assets/icons/ecommerce/store.png'),
  transaction: require('../../../assets/icons/ecommerce/transaction.png'),
  wishlist: require('../../../assets/icons/ecommerce/wishlist.png'),
  '24Hours': require('../../../assets/icons/ecommerce/24-hours.png'),
  advertising: require('../../../assets/icons/ecommerce/advertising.png'),
  barcode: require('../../../assets/icons/ecommerce/barcode.png'),
  callCenter: require('../../../assets/icons/ecommerce/call-center.png'),
  chat: require('../../../assets/icons/ecommerce/chat.png'),
  complain: require('../../../assets/icons/ecommerce/complain.png'),
  delete: require('../../../assets/icons/ecommerce/delete.png'),
  discount: require('../../../assets/icons/ecommerce/discount.png'),
  fastDelivery: require('../../../assets/icons/ecommerce/fast-delivery.png'),
  favourites: require('../../../assets/icons/ecommerce/favourites.png'),
  feedback: require('../../../assets/icons/ecommerce/feedback.png'),
  info: require('../../../assets/icons/ecommerce/info.png'),
  location: require('../../../assets/icons/ecommerce/location.png'),
  notification: require('../../../assets/icons/ecommerce/notification.png'),
  paymentMethod: require('../../../assets/icons/ecommerce/payment-method.png'),
  qrCode: require('../../../assets/icons/ecommerce/qr-code.png'),
  search: require('../../../assets/icons/ecommerce/search.png'),
  securityPayment: require('../../../assets/icons/ecommerce/security-payment.png'),
  settings2: require('../../../assets/icons/ecommerce/settings.png'),
  waranty: require('../../../assets/icons/ecommerce/waranty.png'),
};

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function BaseIcon(props: IconProps) {
  const { icon, color, size } = props;

  return (
    <ImageBackground
      resizeMode="contain"
      height={size || 24}
      width={size || 24}
      source={iconRegistry[icon]}
    />
  );
}
