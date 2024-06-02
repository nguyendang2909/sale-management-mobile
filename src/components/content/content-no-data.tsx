import { RefreshControl, ScrollView, Text, View } from '@gluestack-ui/themed';
import React, { ReactElement } from 'react';
import { SearchImage } from 'src/components';

type FCProps = {
  refresh?: () => void;
  isRefreshing?: boolean;
  title?: string;
  description?: string;
  ActionComponent?: ReactElement;
};

export const ContentNoData: React.FC<FCProps> = ({
  isRefreshing,
  refresh,
  title,
  description,
  ActionComponent,
}) => {
  return (
    <>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        flex={1}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View>
          <View px={16} alignItems="center">
            <SearchImage />
          </View>
          {!!title && (
            <View px={16} mt={24}>
              <Text textAlign="center" bold>
                {title}
              </Text>
            </View>
          )}
          {!!description && (
            <View px={16} mt={24}>
              <Text textAlign="center">{description}</Text>
            </View>
          )}
          {!!ActionComponent && (
            <View px={16} mt={24}>
              {ActionComponent}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
