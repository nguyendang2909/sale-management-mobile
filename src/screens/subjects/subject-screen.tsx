import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from 'src/components';

import { SubjectInfo } from './subject-info';

export const SubjectScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const subject = (route.params as { subject: string }).subject;

  const handleLeftPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header
        leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        title={subject}
        backgroundColor="$backgroundLight100"
      />
      <SubjectInfo />
    </>
  );
};
