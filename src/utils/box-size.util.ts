class SizeUtil {
  getProps(size: 'md' | 'xl' = 'xl') {
    switch (size) {
      case 'md':
        return { height: 32, width: 32 };
      default: {
        return { height: 64, width: 64 };
      }
    }
  }
}

export const sizeUtil = new SizeUtil();
