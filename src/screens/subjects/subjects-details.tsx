import { Divider, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MenuItem } from 'src/components';
import { SCREENS } from 'src/constants';
import { SUBJECTS } from 'src/constants/teacher.constants';

export const SubjectsDetails = () => {
  const navigation = useNavigation();

  return (
    <>
      <View backgroundColor="$white">
        {SUBJECTS.map(e => {
          return (
            <>
              <MenuItem
                title={e}
                leftIcon={<MaterialIcons name="book" />}
                // {...(value ? { value: `${value}` } : {})}
                onPress={() => {
                  navigation.navigate(SCREENS.SUBJECT, {
                    subject: e,
                  });
                }}
              />
              <Divider />
            </>
          );
        })}
      </View>
      <Divider />
    </>
  );
};
