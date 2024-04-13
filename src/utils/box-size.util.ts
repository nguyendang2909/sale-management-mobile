class SizeUtil {
  getProps(size: 'md' | 'xl' | 'lg' = 'xl') {
    switch (size) {
      case 'md':
        return { height: 32, width: 32 };
      case 'lg':
        return { height: 48, width: 48 };
      default: {
        return { height: 64, width: 64 };
      }
    }
  }
}

export const sizeUtil = new SizeUtil();
