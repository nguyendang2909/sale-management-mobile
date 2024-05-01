import { AppStore, CartItem, CartItemsObj, Entity, SkusObj } from 'src/types';

import { BaseUtil } from './base/base.util';

class SkuUtil extends BaseUtil {
  getTotalAmountByCartItem(cartItem: CartItem, sku: Entity.Sku): number {
    const { quantity } = cartItem;
    if (
      sku.wholesalePrice &&
      sku.product?.minWholesalePriceQuantity &&
      sku.product.minWholesalePriceQuantity <= quantity
    ) {
      return sku.wholesalePrice * quantity;
    }
    if (sku.promotionalPrice) {
      return sku.promotionalPrice * quantity;
    }
    if (sku.price) {
      return sku.price * quantity;
    }
    return 0;
  }

  getTotalAndAmountByCartItems(
    cartItems: CartItem[],
    skusObj: SkusObj,
  ): { skuTotal: number; skuTotalAmount: number } {
    return cartItems.reduce<{ skuTotal: number; skuTotalAmount: number }>(
      (result, cartItem) => {
        return {
          skuTotal: result.skuTotal + cartItem.quantity,
          skuTotalAmount:
            result.skuTotalAmount +
            (skusObj[cartItem.skuId]
              ? this.getTotalAmountByCartItem(cartItem, skusObj[cartItem.skuId])
              : 0),
        };
      },
      {
        skuTotal: 0,
        skuTotalAmount: 0,
      },
    );
  }

  getObjFromProducts(products: AppStore.Product[]): Record<string, Entity.Sku> {
    return products.reduce((acc, product) => {
      const { skus, ...restProduct } = product;
      return {
        ...acc,
        ...skus?.reduce<Record<string, Entity.Sku>>((result, sku) => {
          return {
            ...result,
            [sku.id]: { ...sku, product: restProduct },
          };
        }, {}),
      };
    }, {});
  }

  getPickedSkusFromProducts(products: AppStore.Product[], cartItemsObj: CartItemsObj) {
    return products.reduce<Entity.Sku[]>((result, product) => {
      const { skus, ...restProduct } = product;
      const existSkus = skus?.reduce<Entity.Sku[]>(
        (acc, sku) => (cartItemsObj[sku.id] ? acc.concat({ ...sku, product: restProduct }) : acc),
        [],
      );
      return existSkus?.length ? result.concat(...existSkus) : result;
    }, []);
  }

  getPriceByCartItem(cartItem: CartItem, sku: Entity.Sku) {
    return (sku.price || 0) * cartItem.quantity;
  }
}

export const skuUtil = new SkuUtil();
