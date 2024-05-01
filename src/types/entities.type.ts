/* eslint-disable no-use-before-define */
import {
  OrderItemSpecification,
  OrderStatus,
  PaymentMethod,
  Role,
  UserStatus,
  WorkingTimeType,
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
      phoneNumber?: string;
      phoneCode?: string;
      address: string;
      description?: string;
      workingTimeType: WorkingTimeType;
      openTime?: string;
      closeTime?: string;
      businessTypes?: string[];
    }>;

  type Product = BaseEntity &
    Partial<{
      user?: User;
      userId: string;
      title: string;
      minWholesalePriceQuantity?: number;
      isInStock?: boolean;
      isTrackingStock?: boolean;
      description?: string;
      label?: string;
      categories?: Category[];
      images: ProductImage[];
      unit: string;
      attributes: Attribute[];
      skus: Sku[];
    }>;

  type ProductImage = BaseEntity &
    Partial<{
      product?: Product;
      productId?: string;
      path: string;
    }>;

  type Attribute = BaseEntity &
    Partial<{
      product?: Product;
      productId: string;
      title: string;
      specifications?: Specification[];
    }>;

  type Specification = BaseEntity &
    Partial<{
      attribute?: Attribute;
      productToAttributeId: string;
      title: string;
      sort: number;
    }>;

  type Sku = BaseEntity &
    Partial<{
      product?: Product;
      productId: string;
      image?: ProductImage;
      imageId?: string;
      code?: string;
      price: number;
      capitalPrice?: number;
      promotionalPrice?: number;
      wholesalePrice?: number;
      stock?: number | null;
      specifications?: Specification[];
    }>;

  type Category = BaseEntity &
    Partial<{
      user: User;
      userId: string;
      title: string;
      orderPosition: string;
      products: Product[];
    }>;

  type Order = BaseEntity &
    Partial<{
      user?: User;
      userId: string;
      customer?: Customer;
      customerId?: string;
      status: OrderStatus;
      statusUpdatedAt: Date;
      paymentMethod?: PaymentMethod;
      price: number;
      totalAmount: number;
      promotionalPrice?: number;
      deliveryMethod?: string;
      deliveryAddress?: string;
      note?: string;
      code: string;
      at: Date;
      items?: OrderItem[];
    }>;

  type OrderItem = BaseEntity &
    Partial<{
      sku?: Sku;
      skuId: string;
      order?: Order;
      orderId: string;
      title: string;
      image?: ProductImage;
      imageId?: string;
      specifications: OrderItemSpecification[];
      quantity: number;
      sort: number;
      price: number;
      promotionalPrice?: number;
      wholesalePrice?: number;
      minWholesalePriceQuantity?: number;
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
}
