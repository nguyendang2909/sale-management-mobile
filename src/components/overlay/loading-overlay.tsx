import { Spinner, View } from '@gluestack-ui/themed';

export const LoadingOverlay = () => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </View>
  );
};
