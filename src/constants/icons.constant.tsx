import { AreaChart, Package, ShoppingBag, Users, Warehouse } from 'lucide-react-native';

export const NAVIGATION_ICONS = {
  ORDER: ShoppingBag,
  PRODUCT: Package,
  WARE_HOUSE: Warehouse,
  CUSTOMER: Users,
  REPORTS: AreaChart,
} as const;
