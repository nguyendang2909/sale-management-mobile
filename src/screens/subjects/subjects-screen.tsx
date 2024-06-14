import { useNavigation } from '@react-navigation/native';
import { Header } from 'src/components';

import { SubjectsWrapper } from './subject-profiles-wrapper';

export const SubjectsScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        title="Subjects"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <SubjectsWrapper></SubjectsWrapper>
    </>
  );
};
