import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewFooter } from 'src/components';
import { ViewProps } from 'src/types';

export const SectionFooter: FC<ViewProps & { onCreate: () => void; onCreateMore: () => void }> = ({
  onCreate,
  onCreateMore,
  ...viewProps
}) => {
  return (
    <>
      <ViewFooter {...viewProps}>
        <View flexDirection="row" columnGap={16}>
          <View flex={1}>
            <Button variant="outline" onPress={onCreateMore}>
              <ButtonText>Tạo thêm</ButtonText>
            </Button>
          </View>
          <View flex={1}>
            <Button onPress={onCreate}>
              <ButtonText>Hoàn tất</ButtonText>
            </Button>
          </View>
        </View>
      </ViewFooter>
    </>
  );
};
