import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewFooter } from 'src/components';
import { ViewProps } from 'src/types';

export const FooterShop: FC<ViewProps & { onUpdate: () => void }> = ({ onUpdate }) => {
  return (
    <ViewFooter px={16} py={16}>
      <View flexDirection="row" columnGap={16}>
        <View flex={1}>
          <Button variant="solid" onPress={onUpdate}>
            <ButtonText>Cập nhật</ButtonText>
          </Button>
        </View>
      </View>
    </ViewFooter>
  );
};
