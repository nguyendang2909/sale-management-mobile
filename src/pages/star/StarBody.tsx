import { FlatList, Spinner, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import { LoadingOverlay } from 'src/components';
import { MEMBERSHIPS } from 'src/constants';
import { useAppSelector, useMessages } from 'src/hooks';
import { useLikedMe } from 'src/hooks/useLikedMe';
import { Entity } from 'src/types';
import { scrollUtil } from 'src/utils/scroll.util';

import { NoLikedMeBox } from './no-liked-me-box';
import { StarFlatListItem } from './StarFlastListItem';

export const StarBody: React.FC = () => {
  const { formatMessage } = useMessages();
  const navigation = useNavigation();
  const {
    data: likes,
    isLoadingNewest,
    isLoadingNext,
    fetchNewest,
    fetchNext,
    isLoading,
    lastRefreshedAt,
  } = useLikedMe();
  const membership = useAppSelector(state => state.app.profile.membership) || MEMBERSHIPS.FREE;

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }

    fetchNext();
  };

  const handlePressCard = useCallback(
    (like: Entity.View) => {
      navigation.navigate('LikedMeProfile', {
        like,
      });
    },
    [navigation],
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!!lastRefreshedAt && !likes.length) {
    return <NoLikedMeBox />;
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoadingNewest} onRefresh={fetchNewest}></RefreshControl>
        }
        numColumns={2}
        data={likes}
        onScroll={handleScroll}
        ListHeaderComponent={() => (
          <>
            {membership === MEMBERSHIPS.FREE ? (
              <View px={48} py={16}>
                <Text textAlign="center">
                  {formatMessage('Update to Gold to see people who already liked you.')}
                </Text>
              </View>
            ) : (
              <View mt={16}></View>
            )}
          </>
        )}
        ListFooterComponent={
          isLoadingNext ? (
            <View mt={16}>
              <Spinner />
            </View>
          ) : (
            <></>
          )
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keyExtractor={(item, index) => item._id || index}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem={({ item }: { item: Like }) => (
          <StarFlatListItem onPress={handlePressCard} data={item} />
        )}
      ></FlatList>
    </>
  );
};
