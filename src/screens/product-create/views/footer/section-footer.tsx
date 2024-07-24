import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewFooter } from 'src/components';
import { ViewProps } from 'src/types';

export const SectionFooter: FC<
  ViewProps & { onCreate: () => void; onCreateMore: () => void; isSubmitting: boolean }
> = ({ onCreate, onCreateMore, isSubmitting, ...viewProps }) => {
  return (
    <>
      <ViewFooter {...viewProps}>
        <View flexDirection="row" columnGap={16}>
          <View flex={1}>
            <Button variant="outline" onPress={onCreateMore} isDisabled={isSubmitting}>
              <ButtonText>Tạo thêm</ButtonText>
            </Button>
          </View>
          <View flex={1}>
            <Button onPress={onCreate} isDisabled={isSubmitting}>
              <ButtonText>Hoàn tất</ButtonText>
            </Button>
          </View>
        </View>
      </ViewFooter>
    </>
  );
};
