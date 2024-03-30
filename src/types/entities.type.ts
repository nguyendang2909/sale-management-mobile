/* eslint-disable no-use-before-define */
import { OrderStatus, Role, UserStatus, WorkingTimeType } from './data.type';

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
      price: number;
      capitalPrice?: number;
      promotionalPrice?: number;
      wholesalePrice?: number;
      minWholesalePriceQuantity?: number;
      isInStock?: boolean;
      sku?: string;
      barcode?: string;
      inventory?: number;
      isTrackingStock?: boolean;
      description?: string;
      label?: string;
      productsCategories?: ProductCategory[];
      categories?: Category[];
      images: ProductImage[];
      imagePaths: ProductImage[];
      unit: string;
    }>;

  type ProductImage = BaseEntity &
    Partial<{
      product?: Product;
      productId?: string;
      path: string;
    }>;

  type Category = BaseEntity &
    Partial<{
      user: User;
      userId: string;
      title: string;
      orderPosition: string;
      productCategories: ProductCategory[];
    }>;

  type ProductCategory = BaseEntity &
    Partial<{
      product: Product;
      productId: string;
      category: Category;
      categoryId: string;
    }>;

  type Order = BaseEntity &
    Partial<{
      user?: User;
      userId: string;
      customer?: Customer;
      customerId: string;
      status: OrderStatus;
      lastChangedStatus: Date;
      paymentMethod: string;
      price: number;
      promotionPrice?: number;
      deliveryMethod: string;
      ordersProducts?: OrderProduct[];
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
      promotionPrice?: number;
      isWholeSale: boolean;
    }>;

  type Setting = BaseEntity &
    Partial<{
      showTrackingStockNotification: boolean;
      showCreateProductImage: boolean;
      showCreateProductUnit: boolean;
      showCreateProductDescription: boolean;
      showCreateProductPromotionPrice: boolean;
      // showCreateProductWholesalePrice: boolean;
      // showCreateProductTrackingStock: boolean;
      showCreateProductBarcode: boolean;
    }>;
}
