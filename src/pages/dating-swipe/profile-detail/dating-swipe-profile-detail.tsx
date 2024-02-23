import { ScrollView, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ViewSafeArea } from 'src/components';
import { ProfileMenuActions } from 'src/containers/Menu/ProfileMenuActions';
import { UserProfile } from 'src/containers/UserProfile';
import { Entity } from 'src/types';

type FCProps = {
  profile: Entity.Profile;
  onClose: () => void;
  onDislike: () => void;
  onSendLike: () => void;
};

export const DatingSwipeProfileDetail: FC<FCProps> = ({
  profile,
  onClose,
  onDislike,
  onSendLike,
}) => {
  return (
    <>
      <View position="absolute" bottom={10} left={0} right={0} zIndex={999}>
        <ProfileMenuActions
          onDislike={onDislike}
          onSendLike={onSendLike}
          targetUserId={profile._id}
        />
        <ViewSafeArea bottom />
      </View>
      <ScrollView flex={1} backgroundColor="$backgroundLight100">
        <UserProfile profile={profile} onClose={onClose} />
      </ScrollView>
    </>
  );
};
