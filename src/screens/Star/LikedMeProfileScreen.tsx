import { Box, HStack, ScrollView } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { useGetOneLikedMeQuery, useSendViewMutation } from 'src/api';
import { ViewSafeArea } from 'src/components';
import { SendLikeButton } from 'src/containers/button/send-like-button';
import { UserProfile } from 'src/containers/UserProfile';
import { useAppSelector } from 'src/hooks';
import { AppStackScreenProps } from 'src/types';

type FCProps = AppStackScreenProps<'LikedMeProfile'>;

export const LikedMeProfileScreen: React.FC<FCProps> = props => {
  const { like: shortLike } = props.route.params;
  const [sendView] = useSendViewMutation();
  useGetOneLikedMeQuery(shortLike._id, {
    skip: !shortLike._id,
  });
  const like = useAppSelector(s => s.likedMe.data.find(e => e._id === shortLike._id)) || shortLike;

  useEffect(() => {
    // console.log(111);
    if (shortLike.profile?._id) {
      sendView({ targetUserId: shortLike.profile?._id });
    }
  }, [shortLike.profile?._id, sendView]);

  return (
    <>
      <Box flex={1}>
        <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
          <HStack justifyContent="center" rowGap={16} columnGap={16}>
            <SendLikeButton targetUserId={like.profile?._id || ''} />
          </HStack>
          <ViewSafeArea bottom />
        </Box>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          {!!like.profile && <UserProfile profile={like.profile} />}
        </ScrollView>
      </Box>
    </>
  );
};
