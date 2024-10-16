/* eslint-disable no-use-before-define */
import {
  DiscountType,
  InvoiceSettingFontSize,
  OrderStatus,
  PaymentMethod,
  Role,
  UserStatus,
} from './data.type';

export declare namespace Entity {
  type BaseEntity = {
    id: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type MediaFile = BaseEntity & {
    key: string;
    location: string;
  };

  type User = BaseEntity & {
    email?: string;
    appleId?: string;
    phoneNumber?: string;
    phoneCode?: string;
    role?: Role;
    status?: UserStatus;
    fullName?: string;
  };

  type Country = BaseEntity & {
    name?: string;
    iso3?: string;
    numericCode?: string;
    iso2?: string;
    phoneCode?: string;
    capital?: string;
    currency?: string;
    currencyName?: string;
    currencySymbol?: string;
    tld?: string;
    native?: string;
    region?: string;
    subregion?: string;
    translations?: string;
    latitude?: string;
    longitude?: string;
    emoji?: string;
    emojiU?: string;
    sourceId?: number;
  };

  type State = BaseEntity & {
    name?: string;
    country?: Country;
    countryCode?: string;
    iso2?: string;
    type?: string;
    latitude?: string;
    longitude?: string;
    sourceId?: string;
  };

  type Message = BaseEntity & {
    _matchId?: string;
    _userId?: string;
    replyMessage?: Message;
    audio?: string;
    image?: string;
    // likeUserIds?: string[];
    // loveUserIds?: string[];
    text?: string;
    uuid?: string;
    video?: string;
  };

  type Shop = BaseEntity &
    Partial<{
      user: User;
      userId: string;
      title: string;
      phone: string;
      address: string;
      description?: string;
      openTime?: string;
      closeTime?: string;
      businessTypes?: string[];
    }>;

  type Product = BaseEntity &
    Partial<{
      user?: User;
      userId?: string;
      title?: string;
      minWholesalePriceQuantity?: number;
      description?: string;
      label?: string;
      unit: string;
      images?: ProductImage[];
      categories?: Category[];
      options?: ProductOption[];
      variants?: ProductVariant[];
    }>;

  type ProductImage = BaseEntity &
    Partial<{
      path: string;
    }>;

  type ProductOption = BaseEntity &
    Partial<{
      title: string;
      values?: string[];
    }>;

  type ProductVariant = BaseEntity &
    Partial<{
      sku?: string;
      price: number;
      capitalPrice?: number;
      promotionalPrice?: number;
      wholesalePrice?: number;
      stock?: number | null;
      isInStock?: boolean | null;
    }>;

  type ProductVariantWithProduct = ProductVariant & { product: Product };

  type Category = BaseEntity &
    Partial<{
      user: User;
      userId: string;
      title: string;
      products: Product[];
      totalProducts: number;
    }>;

  type Order = BaseEntity &
    Partial<{
      shop?: Shop;
      shopId: string;
      customer?: Customer;
      customerId?: string;
      status: OrderStatus;
      statusUpdatedAt: string;
      deliveredAt?: string;
      amount: number;
      price: number;
      discountType?: DiscountType;
      discountValue?: number;
      deliveryMethod?: string;
      deliveryAddress?: string;
      deliveryFee?: number;
      note?: string;
      code: string;
      at: string;
      items?: OrderItem[];
      payments?: Payment[];
      noteImages: OrderNoteImage[];
    }>;

  type OrderItem = BaseEntity &
    Partial<{
      variantId: string;
      title: string;
      imagePath?: string;
      quantity: number;
      price: number;
      promotionalPrice?: number;
      wholesalePrice?: number;
      minWholesalePriceQuantity?: number;
      discountType?: DiscountType;
      discountValue?: number;
      note?: string;
      option1?: string;
      option2?: string;
      sku?: string;
    }>;

  type OrderNoteImage = BaseEntity &
    Partial<{
      order?: Order;
      orderId?: string;
      path: string;
    }>;

  type Customer = BaseEntity &
    Partial<{
      user: User;
      userId: string;
      fullName: string;
      phoneCode: string;
      phoneNumber: string;
      orders: Order[];
    }>;

  type OrderProduct = BaseEntity &
    Partial<{
      product?: Product;
      productId?: string;
      order?: Order;
      orderId?: string;
      quantity: number;
      price: number;
      promotionalPrice?: number;
      isWholeSale: boolean;
    }>;

  type ProductSetting = BaseEntity &
    Partial<{
      showTrackingStockNotification: boolean;
      showImage: boolean;
      showUnit: boolean;
      showDescription: boolean;
      showPromotionalPrice: boolean;
      // showWholesalePrice: boolean;
      // showTrackingStock: boolean;
      showBarcode: boolean;
    }>;

  type OrderSetting = BaseEntity &
    Partial<{
      showCustomer: boolean;
      showNote: boolean;
    }>;

  type InvoiceSetting = BaseEntity &
    Partial<{
      user?: User;
      userId: string;
      fontSize: InvoiceSettingFontSize;
      title?: string;
      phoneCode?: string;
      phoneNumber?: string;
      showPhoneNumber: boolean;
      showAddress: boolean;
      showQRCode: boolean;
      description: string;
      showShopDescription: boolean;
      showCustomerName: boolean;
      showCustomerPhone: boolean;
      showCustomerPoint: boolean;
      showCustomerAddress: boolean;
      showOrderCode: boolean;
      showOrderNote: boolean;
      showEmployee: boolean;
      showDiningTable: boolean;
      showTime: boolean;
      showPromotionalPrice: boolean;
      showVatRate: boolean;
      vatRate: number;
      showPayout: boolean;
      showDebt: boolean;
      showBankAccount: boolean;
      showBankQR: boolean;
      showShopNote: boolean;
      showShopLogo: boolean;
      showFooterNote: boolean;
      footerNote: string;
    }>;

  type Payment = BaseEntity &
    Partial<{
      shop?: Shop;
      shopId: string;
      order: Order;
      orderId: string;
      amount: number;
      title?: string | null;
      method?: PaymentMethod;
      note?: string;
      images?: PaymentImage[];
      at: string;
    }>;

  type PaymentGroupDate = Partial<{
    date: string;
    expenditureAmount: number;
    incomeAmount: number;
    payments: Payment[];
  }>;

  type PaymentImage = BaseEntity &
    Partial<{
      payment?: Payment;
      paymentId?: string;
      path: string;
    }>;
}
