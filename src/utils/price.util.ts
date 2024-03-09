class PriceUtil {
  format(number: number, currencySymbol = '₫', decimalPlaces = 0): string {
    const roundedNumber = number.toFixed(decimalPlaces);
    const parts = roundedNumber.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedPrice = parts.join('.') + currencySymbol;
    return formattedPrice;
  }
}

export const priceUtil = new PriceUtil();
