import { ChevronLeft } from 'lucide-react-native';
import { Header } from 'src/components';
import { HOME_SCREENS, SCREENS } from 'src/constants';
import { goBack } from 'src/navigations';

export const HeaderSaleReports = () => {
  return (
    <>
      <Header
        title="Báo cáo bán hàng"
        onLeftPress={() => {
          goBack(SCREENS.HOME, {
            screen: HOME_SCREENS.REPORTS,
          });
        }}
        leftIcon={ChevronLeft}
      />
    </>
  );
};
