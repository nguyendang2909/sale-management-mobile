import { HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { NAVIGATION_CARDS } from 'src/constants';
import { ViewProps } from 'src/types';

import { CardFeature } from './card-feature';

export const CardsFeature: FC<ViewProps> = ({ ...viewProps }) => {
  return (
    <View {...viewProps}>
      <HStack flexWrap="wrap" px={8}>
        {NAVIGATION_CARDS.map(navigationCard => (
          <CardFeature data={navigationCard} key={navigationCard.id} />
        ))}
      </HStack>
    </View>
  );
};
