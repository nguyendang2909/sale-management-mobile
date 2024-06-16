import { Fab, FabIcon } from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FC } from 'react';

export const CreateCustomerFab: FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <>
      <Fab onPress={onOpen} bg="$blue500" size="lg" right={16} bottom={24}>
        <FabIcon as={Plus} h="$4" w="$4" />
      </Fab>
    </>
  );
};
