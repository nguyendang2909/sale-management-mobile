import _ from 'lodash';
import { AppStore, CartItem, CartItemsObj, Entity, VariantsMap } from 'src/types';

import { BaseUtil } from './base/base.util';

class ProductVariantUtil extends BaseUtil {
  getAmountByCartItem(
    cartItem: CartItem,
    variant: Entity.ProductVariant,
    product: Entity.Product,
  ): number {
    const { quantity } = cartItem;
    if (
      variant.wholesalePrice &&
      product.minWholesalePriceQuantity &&
      product.minWholesalePriceQuantity <= quantity
    ) {
      return variant.wholesalePrice * quantity;
    }
    if (variant.promotionalPrice) {
      return variant.promotionalPrice * quantity;
    }
    if (variant.price) {
      return variant.price * quantity;
    }
    return 0;
  }

  getTotalAndAmountByCartItems(
    cartItems: CartItem[],
    variantsMap: VariantsMap,
  ): { totalVariants: number; variantAmount: number } {
    return cartItems.reduce<{ totalVariants: number; variantAmount: number }>(
      (result, cartItem) => {
        return {
          totalVariants: result.totalVariants + cartItem.quantity,
          variantAmount:
            result.variantAmount +
            (variantsMap[cartItem.variantId]
              ? this.getAmountByCartItem(
                  cartItem,
                  variantsMap[cartItem.variantId],
                  variantsMap[cartItem.variantId].product,
                )
              : 0),
        };
      },
      {
        totalVariants: 0,
        variantAmount: 0,
      },
    );
  }

  getObjFromProducts(
    products: AppStore.Product[],
  ): Record<string, Entity.ProductVariant & { product: Entity.Product }> {
    return products.reduce((acc, product) => {
      const { variants, ...restProduct } = product;
      return {
        ...acc,
        ...variants?.reduce<Record<string, Entity.ProductVariant>>((result, variant) => {
          return {
            ...result,
            [variant.id]: { ...variant, product: restProduct },
          };
        }, {}),
      };
    }, {});
  }

  getPickedVariantsFromProducts(products: AppStore.Product[], cartItemsObj: CartItemsObj) {
    return products.reduce<(Entity.ProductVariant & { product: Entity.Product })[]>(
      (result, product) => {
        const { variants, ...restProduct } = product;
        const existVariants = variants?.reduce<
          (Entity.ProductVariant & { product: Entity.Product })[]
        >(
          (acc, variant) =>
            cartItemsObj[variant.id] ? acc.concat({ ...variant, product: restProduct }) : acc,
          [],
        );
        return existVariants?.length ? result.concat(...existVariants) : result;
      },
      [],
    );
  }

  getPriceByCartItem(cartItem: CartItem, variant: Entity.ProductVariant) {
    return (variant.price || 0) * cartItem.quantity;
  }

  getStockText({
    isInStock,
    stock,
  }: {
    isInStock?: boolean | null;
    stock?: number | null;
  }): string {
    if (isInStock === null) {
      return !_.isNil(stock) ? `Tồn kho: ${stock}` : '';
    }
    if (!isInStock) {
      return 'Hết hàng';
    }
    return 'Còn hàng';
  }
}

export const productVariantUtil = new ProductVariantUtil();
